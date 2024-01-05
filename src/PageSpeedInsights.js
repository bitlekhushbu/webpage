import React, { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const PageSpeedInsights = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [cruxMetrics, setCruxMetrics] = useState({});
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  const [screenshot, setScreenshot] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('desktop'); // Added state for device selection

  const apiKey = "AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg";

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();

    const inputURL = e.target.url.value;
    setLoadingMessage("Please wait...Running...");

    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
      const json = await response.json();

      const cruxMetricsData = {
        "Cumulative Layout Shift Score": json.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category,
        "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
        "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
        "Time To First Byte": json.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.category,
        "Interaction To Next Paint": json.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category,
        "Largest Contentful Paint": json.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category,
      };

   
      setCruxMetrics(cruxMetricsData);

      const lighthouseData = json.lighthouseResult;
      const lighthouseMetricsData = {
        'Timing': lighthouseData.timing.total,
        'Total Blocking Time': lighthouseData.audits['total-blocking-time'].displayValue,
        'First Contentful Paint': lighthouseData.audits['first-contentful-paint'].displayValue,
        'Largest Contentful Paint': lighthouseData.audits['largest-contentful-paint'].displayValue,
        'Speed Index': lighthouseData.audits['speed-index'].displayValue,
        'Time To Interactive': lighthouseData.audits['interactive'].displayValue,
        'First Meaningful Paint': lighthouseData.audits['first-meaningful-paint'].displayValue,
        'Server Response Time': lighthouseData.audits['server-response-time'].displayValue,
        'Cumulative Layout Shift': lighthouseData.audits['cumulative-layout-shift'].displayValue,
        // 'Time To First Byte': lighthouseData.audits['time-to-first-byte'].displayValue,
        // 'Estimated Input Latency': lighthouseData.audits['estimated-input-latency'].displayValue,
         'Max Potential First Input Delay': lighthouseData.audits['max-potential-fid'].displayValue,
        // 'First CPU Idle': lighthouseData.audits['first-cpu-idle'].displayValue,
         'Total Byte Weight': lighthouseData.audits['total-byte-weight'].displayValue,
        'DOM Size': lighthouseData.audits['dom-size'].numericValue,
        'Bootup Time': lighthouseData.audits['bootup-time'].displayValue,
        'Network Requests': lighthouseData.audits['network-requests'].numericValue,
        'Network RTT': lighthouseData.audits['network-server-latency'].numericValue,
        'Redirects': lighthouseData.audits['redirects'].numericValue,
        // 'Interactive Elements': lighthouseData.audits['interactive-elements'].numericValue,
        'Unused CSS': lighthouseData.audits['unused-css-rules'].numericValue,
      };
      

      setLighthouseMetrics(lighthouseMetricsData);
      showFullPageScreenshot(lighthouseData.fullPageScreenshot);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingMessage("An error occurred while fetching data.");
    }
  };

  const buildQueryURL = (url, key) => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    let query = `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}`; // Include selected device type

    if (key !== "") {
      query += `&key=${key}`;
    }

    return query;
  };

  const showFullPageScreenshot = (screenshotData) => {
    setScreenshot(screenshotData.screenshot.data);
  };

  const renderTable = (metrics) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Metrics</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(metrics).map((key, index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{metrics[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  // const renderBarChart = (metrics, title) => {
  //   const labels = Object.keys(metrics);
  //   const values = Object.values(metrics);

  //   const backgroundColors = [
  //     'rgba(75,192,192,0.4)',
  //     'rgba(255,99,132,0.4)',
  //     'rgba(255,205,86,0.4)',
  //     'rgba(54,162,235,0.4)',
  //   ];

  //   const borderColor = 'rgba(75,192,192,1)';

  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: title,
  //         data: values,
  //         backgroundColor: backgroundColors,
  //         borderColor: borderColor,
  //         borderWidth: 1,
  //         hoverBackgroundColor: backgroundColors.map(color => `${color}B0`),
  //         hoverBorderColor: borderColor,
  //       },
  //     ],
  //   };

  //   const options = {
  //     scales: {
  //       x: {
  //         type: 'category',
  //         title: {
  //           display: true,
  //           text: 'Metrics',
  //         },
  //       },
  //       y: {
  //         title: {
  //           display: true,
  //           text: 'Value',
  //         },
  //       },
  //     },
  //   };

  //   return <Bar data={data} options={options} />;
  // };

  // const renderDoughnutChart = (metrics, title) => {
  //   const labels = Object.keys(metrics);
  //   const values = Object.values(metrics);
  
  //   const backgroundColors = [
  //     'rgba(75,192,192)',
  //     'rgba(255,99,132)',
  //     'rgba(255,205,86)',
  //     'rgba(54,162,235)',
  //   ];
  
  //   const backgroundColor = [
  //     'rgba(75,192,192,0.7)',
  //     'rgba(255,99,132,0.7)',
  //     'rgba(255,205,86,0.7)',
  //     'rgba(54,162,235,0.7)',
  //   ];
  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: title,
  //         data: values,
  //         backgroundColor: backgroundColors,
  //         borderWidth: 1,
  //         hoverBackgroundColor: backgroundColor,
  //       },
  //     ],
  //   };
  
  //   const options = {
  //     aspectRatio: 1, // Maintain a square aspect ratio for the doughnut chart
  //   };
  
  //   return <Doughnut data={data} options={options} />;
  // };

  return (
    <div className="container" id="main">
      <h1>Webpage Speed Test</h1>
      <form onSubmit={getPageSpeedInsights}>
        <div>
          <label>Enter URL to Test Page Speed:</label>
          <input id="url" name="url" type="text" />

        
          <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
          </select>

         

          <button type="submit">Submit</button>
        </div>
      </form>
      <p id="loading">{loadingMessage}</p>
      <div className="container" id="results">
        {Object.keys(cruxMetrics).length > 0 && (
          <div className="result-section">
            <h2>Chrome User Experience Report Results</h2>
            {renderTable(cruxMetrics)}
          </div>
        )}
      

        {Object.keys(lighthouseMetrics).length > 0 && (
          <div className="result-section">
            <h2>Lighthouse Results</h2>
            {renderTable(lighthouseMetrics)}
            {/*{renderBarChart(lighthouseMetrics, 'Lighthouse Metrics')}*/}
          </div>
        )}
        {screenshot && (
          <div className="result-section">
            <h2>Screenshot</h2>
            <img src={screenshot} alt="Full Page Screenshot" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSpeedInsights;
