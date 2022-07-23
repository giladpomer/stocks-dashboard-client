import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StocksPieChart(props) {
    return (
        <Pie className="pie-chart" data={{
            labels: props.stocks.map(stock => stock.name),
            datasets: [
                {
                    data: props.stocks.map(stock => stock.liveData?.sum),
                    backgroundColor: [
                        'rgb(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                    ],
                    borderWidth: 4,
                },
            ],
        }} />
    );
}
