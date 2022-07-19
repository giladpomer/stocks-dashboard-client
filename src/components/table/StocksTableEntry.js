export default function StocksTableEntry(props) {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.value}</td>
            <td>{props.data.amount}</td>
            <td>{props.data.sum}</td>
            <td>{props.data.dailyChange}</td>
        </tr>
    );
}