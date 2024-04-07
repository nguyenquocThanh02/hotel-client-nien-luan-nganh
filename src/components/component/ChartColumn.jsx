import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartColumn = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      const labels = Object.keys(data);
      const values = Object.values(data);
  
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
  
      if (chartRef && chartRef.current) {
        const myChartRef = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(myChartRef, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "total",
                backgroundColor: 'rgba(75,192,192,1)',
                data: values,
              },
            ],
          },
          options: {
            scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value, index, values) {
                      return '$' + value;
                    }
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month',
                    font: {
                      size: 16
                    }
                  }
                }
            }
          }
        });
      }
    }, [data]);
  
    return <canvas ref={chartRef} />;
};

export default ChartColumn;