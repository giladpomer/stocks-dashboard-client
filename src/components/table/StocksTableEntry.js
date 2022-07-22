export default function StocksTableEntry(props) {
    function formatDailyChange(dailyChange) {
        if (!dailyChange) {
            return '';
        }

        if (dailyChange > 0) {
            return '+' + dailyChange;
        }

        return dailyChange;
    }

    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.liveData?.value ?? ''}</td>
            <td>{props.data.amount}</td>
            <td>{props.data.liveData?.sum?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? ''}</td>
            <td>{formatDailyChange(props.data.liveData?.dailyChange) + '%'}</td>
        </tr>
    );
}