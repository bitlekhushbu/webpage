import React, { useState } from 'react';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {
  Tooltip,
  Divider,
  LinearProgress,
  Grid,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import NetworkRequestsPieChart from './NetworkRequestsPieChart';
import TotalByteWeightPieChart from './TotalByteWeightPieChart';

Chart.register(CategoryScale);

const PageSpeedInsights = () => {
  const [selectedLayoutClass, setSelectedLayoutClass] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  const [totalByteWeight, setTotalByteWeight] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [selectedTab, setSelectedTab] = useState('All');
  const apiKey = 'AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL'; // Replace with your actual API key

  const calculateCO2ePerNewVisit = (totalByteWeight) => {
    const totalByteWeightMB = totalByteWeight / 1024 / 1024; // Convert to MB
    const pageWeight = 1.8; // Page weight in MB
    const averageCO2ePerMB = 0.6; // CO2e per MB in grams

    const co2ePerNewVisit = (totalByteWeightMB / pageWeight) * averageCO2ePerMB;
    return co2ePerNewVisit.toFixed(2);
  };

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage('Please wait... Running...');
    const inputURL = e.target.url.value;

    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
      const json = await response.json();

      const lighthouseData = json.lighthouseResult;
      const totalByteWeightKiB = parseFloat(
        lighthouseData.audits['total-byte-weight'].numericValue
      );

      setTotalByteWeight(totalByteWeightKiB);

      const lighthouseMetricsData = {
        Performance: lighthouseData.categories.performance.score * 100,
        'Total Blocking Time': lighthouseData.audits['total-blocking-time'].numericValue / 1000,
        'First Contentful Paint': lighthouseData.audits['first-contentful-paint'].displayValue,
        'Largest Contentful Paint': lighthouseData.audits['largest-contentful-paint'].displayValue,
        'Speed Index': lighthouseData.audits['speed-index'].displayValue,
        'Cumulative Layout Shift': lighthouseData.audits['cumulative-layout-shift'].displayValue,
        'First Input Delay': lighthouseData.audits['max-potential-fid'].numericValue / 1000,
        'Total Byte Weight': `${(totalByteWeightKiB / 1024).toFixed(2)} MB`,
        'Network Requests': lighthouseData.audits['network-requests'].details.items.length,
      };

      setLighthouseMetrics(lighthouseMetricsData);
      setSelectedLayoutClass(selectedDevice === 'desktop' ? 'desktop-layout' : 'mobile-layout');
      setIsDataLoaded(true);
      setLoadingMessage('Data loaded successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadingMessage('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const buildQueryURL = (url, key) => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    let query = `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}&category=performance`;
    if (key) {
      query += `&key=${key}`;
    }
    return query;
  };

  const renderTable = (metrics) => {
    return (
      <Grid container spacing={3}>
        {Object.keys(metrics).map((key, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <h4>
                  {key}
                  <Tooltip title={getTooltipContent(key)} arrow>
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </h4>
                <h3>{metrics[key]}</h3>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const getTooltipContent = (key) => {
    switch (key) {
      case 'Total Blocking Time':
        return 'Sum of all time periods when task length exceeded 50ms.';
      case 'First Contentful Paint':
        return 'Marks the time when the first text or image is painted.';
      case 'Largest Contentful Paint':
        return 'Marks the time when the largest text or image is painted.';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>Webpage Speed Test</h1>
      <form onSubmit={getPageSpeedInsights}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              id="url"
              name="url"
              label="Enter URL to Test Page Speed"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="device"
              name="device"
              select
              label="Select Device"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              fullWidth
            >
              <MenuItem value="desktop">Desktop</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {isLoading ? (
        <LinearProgress />
      ) : (
        isDataLoaded && (
          <div className={selectedLayoutClass}>
            <h2>Metrics Overview</h2>
            {renderTable(lighthouseMetrics)}
            <h2>Carbon Footprint</h2>
            <p>CO2e per New Visit: {calculateCO2ePerNewVisit(totalByteWeight)} gm</p>
          </div>
        )
      )}
      <p>{loadingMessage}</p>
    </div>
  );
};

export default PageSpeedInsights;
