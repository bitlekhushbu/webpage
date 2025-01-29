import React, { useState } from 'react';
import supabase from './supabaseClient'; // Ensure the correct Supabase client configuration
import './PageSpeedInsights.css';
import {
  Divider,
  LinearProgress,
  Button,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';

const PageSpeedInsights = () => {

  console.log(supabase);
  const [selectedLayoutClass, setSelectedLayoutClass] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalByteWeight, setTotalByteWeight] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [totalByteWeightData, setTotalByteWeightData] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState(''); // State for generated URL

  const apiKey = 'AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg';

  const calculateCO2ePerNewVisit = (totalByteWeight) => {
    const totalByteWeightMB = totalByteWeight / 1024 / 1024; // Convert bytes to MB
    const pageWeightMB = 1.8; // Average page weight in MB
    const averageCO2ePerNewVisit = 0.6; // Average CO2e per visit in grams

    const co2ePerNewVisit = (totalByteWeightMB / pageWeightMB) * averageCO2ePerNewVisit;
    return co2ePerNewVisit.toFixed(2);
  };

  const buildQueryURL = (url, key) => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    let query = `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}&category=performance`;
    if (key) {
      query += `&key=${key}`;
    }
    return query;
  };

  const generateUniqueUrl = (id) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `/report/${id}-${timestamp}-${randomString}`;
  };
  
  

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage('Please wait...Running...');
    const inputURL = e.target.url.value;
    const email = e.target.email.value;
  
    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const json = await response.json();
      const lighthouseData = json.lighthouseResult;
  
      const totalByteWeightData = lighthouseData.audits['total-byte-weight'];
      const totalByteWeightValue = totalByteWeightData.numericValue;
  
      const co2ePerVisit = calculateCO2ePerNewVisit(totalByteWeightValue);
  
      setTotalByteWeightData({
        title: totalByteWeightData.title,
        description: totalByteWeightData.description,
        displayValue: totalByteWeightData.displayValue,
        numericValue: totalByteWeightValue,
      });
  
      setTotalByteWeight(totalByteWeightValue);
      setSelectedLayoutClass(selectedDevice === 'desktop' ? 'desktop-layout' : 'mobile-layout');
      setIsDataLoaded(true);
  
      const pageWeightFormatted = `${(totalByteWeightValue / 1024 / 1024).toFixed(2)} MB`;
      const co2ePerVisitFormatted = `${co2ePerVisit} gm`;
  
      // Save data to Supabase
      const { data, error } = await supabase
        .from('page_speed_data')
        .insert([
          {
            url: inputURL,
            page_weight: pageWeightFormatted,
            co2e_per_visit: co2ePerVisitFormatted,
            email: email,
          },
        ])
        .select();
  
      if (error) {
        console.error('Supabase Error:', error);
        throw new Error('Error saving data to Supabase');
      }
  
      const uniqueUrl = generateUniqueUrl(data[0].id);
      setGeneratedUrl(uniqueUrl);
  
      // Update the unique URL in Supabase
      await supabase
        .from('page_speed_data')
        .update({ unique_url: uniqueUrl })
        .eq('id', data[0].id);
  
      // Send email
      const emailResponse = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          data: {
            url: inputURL,
            pageWeight: pageWeightFormatted,
            co2ePerVisit: co2ePerVisitFormatted,
            reportUrl: uniqueUrl,
          },
        }),
      });
  
      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }
  
      setLoadingMessage('Data loaded and email sent successfully');
    } catch (error) {
      console.error('Error:', error);
      setLoadingMessage(error.message || 'An error occurred while processing data.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container" id="main">
      <h1>Webpage Speed Test</h1>
      <form onSubmit={getPageSpeedInsights}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              id="url"
              name="url"
              type="text"
              label="Enter URL to Test Page Speed"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Enter your Email"
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

      <p id="loading">{loadingMessage}</p>

      {isLoading ? (
        <LinearProgress />
      ) : (
        isDataLoaded && (
          <div className={`container ${selectedLayoutClass}`} id="results">
            <Divider />
            {totalByteWeight > 0 && (
              <div className="result-section carbon_footprint">
                <h2>Carbon Footprint</h2>
                <div className="main_content">
                  <div className="main_item">
                    <p>Page Weight</p>
                    <h3>{(totalByteWeight / 1024 / 1024).toFixed(2)} MB</h3>
                  </div>
                  <div className="main_item">
                    <p>CO2e per New Visit</p>
                    <h3>{calculateCO2ePerNewVisit(totalByteWeight)} gm</h3>
                  </div>
                </div>
              </div>
            )}
            <Divider />
            <div>
              <h3>Your unique report URL:</h3>
              <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
                {generatedUrl}
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PageSpeedInsights;
