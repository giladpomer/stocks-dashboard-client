import Table from 'react-bootstrap/Table';

import StocksTableEntry from './StocksTableEntry';

export default function StocksTable() {
    function getList() {
        return [
            {
                id: 'US88160R1014',
                name: 'Tesla Inc.',
                value: 100,
                amount: 2,
                sum: 200,
                dailyChange: '+1.00%'
            },
            {
                id: 'US0231351067',
                name: 'Amazon.Com Inc.',
                value: 50,
                amount: 6,
                sum: 300,
                dailyChange: '+2.20%'
            }
        ];
    };

    function getEntries() {
        return getList().map((data) =>
            <StocksTableEntry
                key={data.id}
                data={data}
            />
        );
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
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