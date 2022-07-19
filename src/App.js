import './App.css';

import Table from 'react-bootstrap/Table';

function App() {
    return (
        <div className="App">
            <h1>
                Stocks Dashboard
            </h1>

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
                    <tr>
                        <td>Tesla</td>
                        <td>100</td>
                        <td>2</td>
                        <td>200</td>
                        <td>+1.00%</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default App;
