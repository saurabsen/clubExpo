import './charts.css';
import Chart from "react-google-charts";

const Charts = (props) => {

  return (
    <div className="chart">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={props.chartData}
        />
    </div>
  );
};

export default Charts;
