import React from 'react';

export default function StocksTableEntry(props) {
    const [_stockValue, setStockValue] = React.useState(null);
    const [_stockValueChange, setStockValueChange] = React.useState(0);

    React.useEffect(() => {
        setStockValue(prevValue => {
            var newValue = props.data.liveData?.value;

            setStockValueChange(newValue - prevValue);

            return newValue;
        });

        const timeoutId = setTimeout(clearStockValueChange, 3000);

        return function cleanup() {
            clearTimeout(timeoutId);
        };
    }, [props.data.liveData?.value]);

    function clearStockValueChange() {
        setStockValueChange(0);
    }

    function formatDailyChange(dailyChange) {
        if (!dailyChange) {
            return '';
        }

        if (dailyChange > 0) {
            return '+' + dailyChange;
        }

        return dailyChange;
    }

    function getChangeClassName(dailyChange) {
        if (dailyChange == null) {
            return '';
        }

        if (dailyChange > 0) {
            return 'up';
        }

        if (dailyChange < 0) {
            return 'down';
        }

        return '';
    };

    return (
        <tr className='stock'>
            <td>
                {props.data.name}
            </td>
            <td className={getChangeClassName(_stockValueChange)}>
                {props.data.liveData?.value ?? ''}
            </td>
            <td>
                {props.data.amount?.toLocaleString('en-US')}
            </td>
            <td className={getChangeClassName(_stockValueChange)}>
                {props.data.liveData?.sum?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? ''}
            </td>
            <td className={getChangeClassName(props.data.liveData?.dailyChange)}>
                {formatDailyChange(props.data.liveData?.dailyChange)?.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '%'}
            </td>
        </tr>
    );
}