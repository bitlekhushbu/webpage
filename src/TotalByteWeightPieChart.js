import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TotalByteWeightPieChart = ({ networkRequestsData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (networkRequestsData && networkRequestsData.details && networkRequestsData.details.items) {
      const data = {
        labels: [
          `Javascript Files (${calculateTotalByteWeight('script', networkRequestsData.details.items)} KB)`,
          `Image Files (${calculateTotalByteWeight('image', networkRequestsData.details.items)} KB)`,
          `Font Files (${calculateTotalByteWeight('font', networkRequestsData.details.items)} KB)`,
          `CSS Files (${calculateTotalByteWeight('stylesheet', networkRequestsData.details.items)} KB)`,
          `HTML Files (${calculateTotalByteWeight('document', networkRequestsData.details.items)} KB)`,
          `Media Files (${calculateTotalByteWeight('media', networkRequestsData.details.items)} KB)`,
          `Other Files (${calculateOtherTotalByteWeight(networkRequestsData.details.items)} KB)`,
        ],
        datasets: [{
          data: [
            calculateTotalByteWeight('script', networkRequestsData.details.items),
            calculateTotalByteWeight('image', networkRequestsData.details.items),
            calculateTotalByteWeight('font', networkRequestsData.details.items),
            calculateTotalByteWeight('stylesheet', networkRequestsData.details.items),
            calculateTotalByteWeight('document', networkRequestsData.details.items),
            calculateTotalByteWeight('media', networkRequestsData.details.items),
            calculateOtherTotalByteWeight(networkRequestsData.details.items),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(200, 200, 200, 1)',
          ],
        }],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#000',
              fontSize: 16,
            },
          },
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const value = dataset.data[tooltipItem.index];
              return `${data.labels[tooltipItem.index]}: ${bytesToKiB(value)} KB`;
            },
          },
        },
        cutout: '50%',
      };

      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
      });

      chart.canvas.parentNode.style.position = 'relative';
      chart.canvas.style.width = '100% !important';
      
    }
  }, [networkRequestsData]);

  const calculateTotalByteWeight = (type, items) => {
    return (items
      .filter(item => item.resourceType && item.resourceType.toLowerCase().includes(type))
      .reduce((total, item) => total + (item.resourceSize || 0), 0) / 1024).toFixed(2); // Convert to kilobytes and round to 2 decimal places
  };
  
  const calculateOtherTotalByteWeight = (items) => {
    return (items
      .filter(item => !['script', 'image', 'font', 'stylesheet', 'document', 'media'].includes(item.resourceType.toLowerCase()))
      .reduce((total, item) => total + (item.resourceSize || 0), 0) / 1024).toFixed(2); // Convert to kilobytes and round to 2 decimal places
  };
  
  

  const bytesToKiB = (bytes) => (bytes / 1024).toFixed(2);

  return (
    <div>
      <canvas ref={chartRef} width="100%" height="auto"></canvas>
    </div>
  );
};

export default TotalByteWeightPieChart;
