// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';
import {TradingView} from '../charting_library/charting_library.standalone.js'

window.tvWidget = new TradingView.widget({
    height: '50px',
    symbol: 'Monetax:AMC/USDT',            // Default symbol pair
    interval: '1',                        // Default interval
    fullscreen: true,                      // Displays the chart in the fullscreen mode
    container: 'tv_chart_container',       // Reference to an attribute of a DOM element
    datafeed: Datafeed,
    library_path: '../charting_library_cloned_data/charting_library/',
    disabled_features: [
        'use_localstorage_for_settings',
        'left_toolbar', 'header_widget', 'timeframes_toolbar', 'edit_buttons_in_legend', 
        'context_menus', 'control_bar', 'border_around_the_chart',
    ],
    overrides: {
        "paneProperties.background": "#222222",
        "paneProperties.vertGridProperties.color": "#454545",
        "paneProperties.horzGridProperties.color": "#454545",
        "scalesProperties.textColor" : "#AAA"
    }
});