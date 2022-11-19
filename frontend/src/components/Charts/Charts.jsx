import './charts.css';
import Chart from 'react-google-charts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Charts = (props) => {
  const { chartData, title, options } = props;
  return (
    <>
      {chartData != null && chartData.length > 0 && (
        <div className="chart">
          <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
              <CardContent>
                <Typography
                  sx={{ pt: { md: 4 }, pl: { md: 4 }, pb: { md: 2 } }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="400px"
                  data={chartData}
                  options={options}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
    </>
  );
};

export default Charts;
