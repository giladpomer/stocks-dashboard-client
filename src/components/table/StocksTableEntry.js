import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function StocksTableEntry(props) {
    const [_stockValue, setStockValue] = React.useState(null);
    const [_stockValueChange, setStockValueChange] = React.useState(0);
    const [_stockAmount, setStockAmount] = React.useState(props.data.amount);

    React.useEffect(() => {
        setStockValue(prevValue => {
            const newValue = props.data.liveData?.value;

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
    }

    function deleteStock() {
        props.onDelete(props.data);
    }

    function updateStockAmount(e) {
        const amount = e.target.value;

        setStockAmount(amount);
        props.onUpdateAmount(props.data, amount);
    }

    return (
        <tr className='stock'>
            {props.isEditMode &&
                <td>
                    <Button onClick={deleteStock} variant="outline-danger" size="sm">X</Button>
                </td>
            }
            <td>
                {props.data.name}
            </td>
            <td className={getChangeClassName(_stockValueChange)}>
                &euro;{props.data.liveData?.value ?? ''}
            </td>
            <td>
                {props.isEditMode
                    ? <Form.Control
                        className="amount-input"
                        size="sm"
                        type="number"
                        placeholder="Amount"
                        onChange={updateStockAmount}
                        value={_stockAmount?.toLocaleString('en-US')} />
                    : _stockAmount?.toLocaleString('en-US')
                }
            </td>
            <td className={getChangeClassName(_stockValueChange)}>
                &euro;{props.data.liveData?.sum?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? ''}
            </td>
            <td className={getChangeClassName(props.data.liveData?.dailyChange)}>
                {formatDailyChange(props.data.liveData?.dailyChange)?.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '%'}
            </td>
        </tr>
    );
}