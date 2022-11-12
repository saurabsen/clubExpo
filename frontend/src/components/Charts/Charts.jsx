import './charts.css';
import Chart from "react-google-charts";

const Charts = () => {
  const data = [
    ["Element", "Events", { role: "style" }],
    ["Mon", 8, "#8658CE"], // RGB value
    ["Tue", 10, "#8658CE"], // English color name
    ["Wed", 19, "#8658CE"],
    ["Thu", 21, "color: #8658CE"],
    ["Fri", 22, "color: #8658CE"],
    ["Sat", 23, "color: #8658CE"],
  ];
  return (
    <div className="chart">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={data}
        />
    </div>
  );
};

export default Charts;
