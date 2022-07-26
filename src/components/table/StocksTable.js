import Table from 'react-bootstrap/Table';

import StocksTableEntry from './StocksTableEntry';

export default function StocksTable(props) {
    function getEntries() {
        return props.stocks.map((data) =>
            <StocksTableEntry
                key={data.id}
                data={data}
                onDelete={props.onDeleteStock}
                isEditMode={props.isEditMode}
            />
        );
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {props.isEditMode && <th></th>}
                    <th>Name</th>
                    <th>Value</th>
                    <th>Amount</th>
                    <th>Sum</th>
                    <th>Daily Change</th>
                </tr>
            </thead>
            <tbody>
                {getEntries()}
            </tbody>
        </Table>
    );
}