
import { io } from "socket.io-client";
const socket = io('wss://api.monetaxexchange.com:8000');
const channelToSubscription = new Map();

socket.on('connect', () => {
    console.log('[socket] Connected');
});

socket.on('disconnect', (reason) => {
    console.log('[socket] Disconnected:', reason);
});

socket.on('error', (error) => {
    console.log('[socket] Error:', error);
});
socket.on('m', tData => {
    //console.log('[socket] Message:', tData);
    const data = JSON.parse(tData.data);
    const eventTypeStr = '1';
    const exchange = 'MONETAX';
    const fromSymbol = 'AMC';
    const toSymbol = 'USDT';
    const tradeHigh = data.high;
    const tradeLow = data.low;
    const tradeOpen = data.open;
    const tradeClose = data.close;
    const tradeTime = parseInt(data.time);

    const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
    const subscriptionItem = channelToSubscription.get(channelString);

    const lastDailyBar = subscriptionItem.lastDailyBar;
    const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

    let bar;
    if (tradeTime >= nextDailyBarTime) {
        console.log('[socket] Message:', tData);
        bar = {
            time: nextDailyBarTime,
            open: lastDailyBar.close,
            high: tradeHigh,
            low: tradeLow,
            close: tradeClose,
        };
        console.log('[socket] Generate new bar', bar);
    } else {
        bar = {
            time: tradeTime,
            open: lastDailyBar.close,
            high: tradeHigh + lastDailyBar.high,
            low: tradeLow + lastDailyBar.low,
            close: tradeClose + lastDailyBar.close,
        };
        // bar = {
        //     ...lastDailyBar,
        //     time: tradeTime,
        //     open: lastDailyBar.close,
        //     high: (Math.random() * 1.1) + lastDailyBar.high,
        //     low: (Math.random() * 0.8) + lastDailyBar.low,
        //     close: (Math.random() * 10) + lastDailyBar.close,
        // };
        console.log('[socket] Update the latest bar by price', lastDailyBar.close);
    }
    subscriptionItem.lastDailyBar = bar;
    // Send data to every subscriber of that symbol
    subscriptionItem.handlers.forEach(handler => handler.callback(bar));

});

function getNextDailyBarTime(barTime) {
    const date = new Date(barTime * 1000);
    date.setDate(date.getDate() + 1);
    return date.getTime() / 1000;
}

export function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback,
    lastDailyBar
)
{
    const channelString = '0~MONETAX~AMC~USDT';//`0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
    const handler = {
        id: subscriberUID,
        callback: onRealtimeCallback,
    };
    let subscriptionItem = channelToSubscription.get(channelString);
    if (subscriptionItem) {
        // Already subscribed to the channel, use the existing subscription
        subscriptionItem.handlers.push(handler);
        return;
    }
    subscriptionItem = {
        subscriberUID,
        resolution,
        lastDailyBar,
        handlers: [handler],
    };
    channelToSubscription.set(channelString, subscriptionItem);
    console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
    socket.emit('SubAdd', { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID) {

    // Find a subscription with id === subscriberUID
    for (const channelString of channelToSubscription.keys()) {
        const subscriptionItem = channelToSubscription.get(channelString);
        const handlerIndex = subscriptionItem.handlers
            .findIndex(handler => handler.id === subscriberUID);

        if (handlerIndex !== -1) {
            // Remove from handlers
            subscriptionItem.handlers.splice(handlerIndex, 1);

            if (subscriptionItem.handlers.length === 0) {
                // Unsubscribe from the channel if it is the last handler
                console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
                socket.emit('SubRemove', { subs: [channelString] });
                channelToSubscription.delete(channelString);
                break;
            }
        }
    }
}

