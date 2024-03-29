import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import StocksTable from '../table/StocksTable';
import StocksPieChart from '../pie-chart/StocksPieChart';

export default function StocksDashboard() {
    const [_stocks, setStocks] = React.useState(getList());
    const [_isEditMode, setIsEditMode] = React.useState(false);

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
        const currentStocksLiveData = await getCurrentStocksLiveData();

        setStocks(prevStocks => {
            const stocks = [...prevStocks];

            for (let i = 0; i < stocks.length; i++) {
                const stock = stocks[i];
                stock.liveData = currentStocksLiveData[stock.id];
            }

            return stocks;
        });
    }

    async function getCurrentStocksLiveData() {
        const currentStocksLiveData = {};

        for (let i = 0; i < _stocks.length; i++) {
            const stock = _stocks[i];
            const liveData = await getStockLiveData(stock);

            currentStocksLiveData[stock.id] = liveData;
        }

        return currentStocksLiveData;
    }

    async function getStockLiveData(stock) {
        const response = await axios.get('https://www.tradegate.de/refresh.php?isin=' + stock.id);
        const stockData = response.data;

        const liveData = {
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

    function toggleEditMode() {
        setIsEditMode(isEditMode => !isEditMode);
    }

    function deleteStock(stock) {
        setStocks(prevStocks => {
            const stocks = [...prevStocks];

            return stocks.filter(item => item !== stock);
        });
    }

    function updateStockAmount(stock, amount) {
        setStocks(prevStocks => {
            const stocks = [...prevStocks];

            const stockItem = stocks.find(item => item === stock);
            stockItem.amount = amount;
            updateStockSum(stockItem);

            return stocks;
        });
    }

    function updateStockSum(stock) {
        if (!stock.liveData) {
            return;
        }

        stock.liveData.sum = stock.liveData.value * stock.amount;
    }

    return (
        <div>
            <Button onClick={toggleEditMode} className="edit-button" variant={_isEditMode ? 'outline-success' : 'outline-primary'}>
                {_isEditMode ? 'Done' : 'Edit Stocks'}
            </Button>

            <StocksTable
                stocks={_stocks}
                onDeleteStock={deleteStock}
                onUpdateStockAmount={updateStockAmount}
                isEditMode={_isEditMode}
            />
            <StocksPieChart stocks={_stocks} />
        </div>
    );
}