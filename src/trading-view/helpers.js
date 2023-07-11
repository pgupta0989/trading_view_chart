// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
        return response.json();
    } catch(error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}

export async function makeApiMonetaRequest(path) {
    try {
        const response = await fetch(`https://api.monetaxexchange.com:8000/${path}`);
        return response.json();
    } catch(error) {
        console.log(error);
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}

export async function makeCsvApiRequest() {
    const timestamp = Date.now();
    console.log('in csv api');
    // //fetch(`https://monetaxexchange.com/${path}`);
    // const response = await fetch('https://monetaxexchange.com/data.csv', { mode: 'no-cors',
    // headers : { 
    //     'content-type': 'text/csv;charset=UTF-8'
    //    }});
    // const data = await response.text();
    // console.log(data);
    var dataLoadft ={"Response": "Success",
    "Type": 100,
    "Aggregated": false,
    "TimeTo": 1687101400,
    "TimeFrom": 1687100400,
    "FirstValueInArray": true,
    "ConversionType": {
        "type": "force_direct",
        "conversionSymbol": ""
    },
    "Data":  
        [
            {
                "time": 1687100460,
                "close": 16384,
                "high": 16999,
                "low": 15851,
                "open": 16171,
                "volumefrom": 44975.63,
                "volumeto": 736682606.75,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100520,
                "close": 17569,
                "high": 18111,
                "low": 16349,
                "open": 16384,
                "volumefrom": 59851.03,
                "volumeto": 1044216461.5,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100580,
                "close": 19210,
                "high": 19550,
                "low": 17050,
                "open": 17569,
                "volumefrom": 45331,
                "volumeto": 836392677.4,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100640,
                "close": 18961,
                "high": 19891,
                "low": 18622,
                "open": 19210,
                "volumefrom": 48747.05,
                "volumeto": 937965444.83,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100700,
                "close": 18928,
                "high": 19175,
                "low": 18010,
                "open": 18961,
                "volumefrom": 52496.11,
                "volumeto": 974801267.97,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100760,
                "close": 17345,
                "high": 18987,
                "low": 16400,
                "open": 18928,
                "volumefrom": 61905.48,
                "volumeto": 1107377557.31,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100820,
                "close": 16425,
                "high": 17709,
                "low": 15500,
                "open": 17345,
                "volumefrom": 79577.44,
                "volumeto": 1317507611.8,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100880,
                "close": 15645,
                "high": 17333,
                "low": 14801,
                "open": 16425,
                "volumefrom": 64360.43,
                "volumeto": 1027276532.46,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687100940,
                "close": 13173,
                "high": 15842.43,
                "low": 10700,
                "open": 15645,
                "volumefrom": 169892.84,
                "volumeto": 2223207787.82,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687101000,
                "close": 14035,
                "high": 14999,
                "low": 12521,
                "open": 13173,
                "volumefrom": 58568.66,
                "volumeto": 831326801.92,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687101060,
                "close": 13477,
                "high": 14050,
                "low": 11600,
                "open": 14035,
                "volumefrom": 70688.48,
                "volumeto": 906103698.66,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687101120,
                "close": 13633,
                "high": 14278,
                "low": 12675,
                "open": 13477,
                "volumefrom": 44826.26,
                "volumeto": 606634803.89,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687101180,
                "close": 15680,
                "high": 16060,
                "low": 13531,
                "open": 13633,
                "volumefrom": 61169.56,
                "volumeto": 926179176.72,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": 1687101240,
                "close": 15375,
                "high": 16494,
                "low": 14454,
                "open": 15680,
                "volumefrom": 53701.63,
                "volumeto": 829436907.21,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            },
            {
                "time": Math.floor(timestamp/1000),
                "close": 14323,
                "high": 15468,
                "low": 13145,
                "open": 15375,
                "volumefrom": 69628.81,
                "volumeto": 977111940.28,
                "conversionType": "force_direct",
                "conversionSymbol": ""
            }
   ]
};
   return dataLoadft;
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}
