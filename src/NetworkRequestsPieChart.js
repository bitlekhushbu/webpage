
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const NetworkRequestsPieChart = ({ networkRequestsData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (networkRequestsData && networkRequestsData.details && networkRequestsData.details.items) {
      // const totalRequests = networkRequestsData.details.items.length;

      const data = {
        labels: [
          `Javascript Files (${calculateResourceTypeCount('script', networkRequestsData.details.items)})`,
          `Image Files (${calculateResourceTypeCount('image', networkRequestsData.details.items)})`,
          `Font Files (${calculateResourceTypeCount('font', networkRequestsData.details.items)})`,
          `CSS Files (${calculateResourceTypeCount('stylesheet', networkRequestsData.details.items)})`,
          `HTML Files (${calculateResourceTypeCount('document', networkRequestsData.details.items)})`,
          `Media Files (${calculateResourceTypeCount('media', networkRequestsData.details.items)})`,
          `Other (${calculateOtherResourceTypes(networkRequestsData.details.items)})`,
        ],
        datasets: [{
          data: [
            calculateResourceTypeCount('script', networkRequestsData.details.items),
            calculateResourceTypeCount('image', networkRequestsData.details.items),
            calculateResourceTypeCount('font', networkRequestsData.details.items),
            calculateResourceTypeCount('stylesheet', networkRequestsData.details.items),
            calculateResourceTypeCount('document', networkRequestsData.details.items),
            calculateResourceTypeCount('media', networkRequestsData.details.items),
            calculateOtherResourceTypes(networkRequestsData.details.items),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(200, 200, 200, 1)', // For 'Other' resource types
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
              color: '#000', // Set the text color of the legend labels
              fontSize: 24, // Set the font size of the legend labels
              // Add any other CSS styles as needed
            },
          },
        },
        tooltips: {
          enabled: true,
        },
        cutout: '50%', // Adjust the cutout to make space for the center text
      };

      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
      });

       chart.canvas.parentNode.style.position = 'relative';
      
    }
  }, [networkRequestsData]);

  const calculateResourceTypeCount = (type, items) => {
    return items.filter(item => item.resourceType && item.resourceType.toLowerCase().includes(type)).length;
  };

  const calculateOtherResourceTypes = (items) => {
    return items.filter(item => !['script', 'image', 'font', 'stylesheet', 'document', 'media'].includes(item.resourceType.toLowerCase())).length;
  };

  return (
    <div>
      <canvas ref={chartRef} width="100%" height="auto"></canvas>
    </div>
  );
};

export default NetworkRequestsPieChart;
