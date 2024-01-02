import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const PageSpeedInsights = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [cruxMetrics, setCruxMetrics] = useState({});
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  const [screenshot, setScreenshot] = useState('');




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
      };


      setCruxMetrics(cruxMetricsData);


      const lighthouseData = json.lighthouseResult;
      const lighthouseMetricsData = {
        // 'Timing': parseFloat(lighthouseData.timing.total),
        // 'Total Blocking Time': parseFloat(lighthouseData.audits['total-blocking-time'].displayValue),
        'First Contentful Paint': parseFloat(lighthouseData.audits['first-contentful-paint'].displayValue),
        'Largest Contentful Paint': parseFloat(lighthouseData.audits['largest-contentful-paint'].displayValue),
        'Speed Index': parseFloat(lighthouseData.audits['speed-index'].displayValue),
        'Time To Interactive': parseFloat(lighthouseData.audits['interactive'].displayValue),
        // Add other metrics as needed
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
    let query = `${api}?url=${encodeURIComponent(url)}`;



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


  const renderBarChart = (metrics, title) => {
    const labels = Object.keys(metrics);
    const values = Object.values(metrics);
  
    const backgroundColors = [
      'rgba(75,192,192,0.4)',
      'rgba(255,99,132,0.4)',
      'rgba(255,205,86,0.4)',
      'rgba(54,162,235,0.4)',
      // 'rgba(153,102,255,0.4)',
      // 'rgba(255,159,64,0.4)',
    ];
  
    const borderColor = 'rgba(75,192,192,1)';
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColor,
          borderWidth: 1,
          hoverBackgroundColor: backgroundColors.map(color => `${color}B0`), // Slightly darker on hover
          hoverBorderColor: borderColor,
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Metrics',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value',
          },
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };

  return (
    <div className="container" id="main">
      <h1>Webpage Speed Test</h1>
      <form onSubmit={getPageSpeedInsights}>
        <div>
          <label>Enter URL to Test Page Speed:</label>
          <input id="url" name="url" type="text" />
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
            {renderBarChart(lighthouseMetrics, 'Lighthouse Metrics')}
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