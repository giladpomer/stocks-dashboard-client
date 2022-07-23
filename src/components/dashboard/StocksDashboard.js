import React from 'react';
import axios from 'axios';

import StocksTable from '../table/StocksTable';
import StocksPieChart from '../pie-chart/StocksPieChart';

export default function StocksDashboard() {
    const [_stocks, setStocks] = React.useState(getList());

    React.useEffect(() => {
        refreshStocksLiveData();

        const timerId = setInterval(refreshStocksLiveData, 5000);

        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    function getList() {
        return [
            {
                id: 'US88160R1014',
                name: 'Tesla Inc.',
                amount: 2
            },
            {
                id: 'US0231351067',
                name: 'Amazon.Com Inc.',
                amount: 6
            },
            {
                id: 'US0378331005',
                name: 'Apple Inc.',
                amount: 3
            },
            {
                id: 'US30303M1027',
                name: 'Meta Platforms Inc.',
                amount: 1
            }
        ];
    }

    async function refreshStocksLiveData() {
        var currentStocksLiveData = await getCurrentStocksLiveData();

        setStocks(prevStocks => {
            var stocks = [...prevStocks];

            for (var i = 0; i < stocks.length; i++) {
                var stock = stocks[i];
                stock.liveData = currentStocksLiveData[stock.id];
            }

            return stocks;
        });
    }

    async function getCurrentStocksLiveData() {
        var currentStocksLiveData = {};

        for (var i = 0; i < _stocks.length; i++) {
            var stock = _stocks[i];
            var liveData = await getStockLiveData(stock);

            currentStocksLiveData[stock.id] = liveData;
        }

        return currentStocksLiveData;
    }

    async function getStockLiveData(stock) {
        var response = await axios.get('https://www.tradegate.de/refresh.php?isin=' + stock.id);
        var stockData = response.data;

        var liveData = {
            value: forceUSNumberFormatting(stockData.bid),
            dailyChange: forceUSNumberFormatting(removePossiblePlusSign(stockData.delta))
        };

        liveData.sum = liveData.value * stock.amount;

        return liveData;
    }

    function forceUSNumberFormatting(value) {
        if (value == null) {
            return '';
        }

        if (typeof value === 'string' || value instanceof String) {
            return (value).replace(' ', '').replace(',', '.');
        }

        return value;
    }

    function removePossiblePlusSign(value) {
        return (value + '').replace('+', '');
    }

    return (
        <div>
            <StocksTable stocks={_stocks} />
            <StocksPieChart stocks={_stocks} />
        </div>
    );
}