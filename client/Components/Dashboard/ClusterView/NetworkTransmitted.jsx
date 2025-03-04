import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchChartData } from '../../../helpers.js'

/* 
This is a line chart we imported from chart.js to display the Network Pressure 
of the whole cluster over time. The data from the cluster query is being 
passed down from the cluster dashboard component ***or home component if 
we use context api*** and is used here to populate the data points on the line
graph. 

We wanted to make this a streaming live data chart initally, but never
got that fully Implemented. 
*/

const NetworkTransmitted = ({ chartDurationHours }) => {
  const [chartData, setChartData] = useState({});

  async function chart() {
    const data = await fetchChartData('networkTransmitted', chartDurationHours, '5m');
    setChartData(data);
  }

  useEffect(() => {
    chart();
  }, [chartDurationHours]);

  return (
    <div className="StreamingNetworkPressure streams">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: { text: "Network Pressure", display: true },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default NetworkTransmitted;
