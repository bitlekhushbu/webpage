import React, { useState } from 'react';
import supabase from './supabaseClient'; // Ensure Supabase is configured correctly
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
  const [selectedLayoutClass, setSelectedLayoutClass] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalByteWeight, setTotalByteWeight] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [totalByteWeightData, setTotalByteWeightData] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState('');

  const apiKey = 'AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg';

  const calculateCO2ePerNewVisit = (totalByteWeight) => {
    const totalByteWeightMB = totalByteWeight / 1024 / 1024;
    const pageWeightMB = 1.8;
    const averageCO2ePerNewVisit = 0.6;  

    return ((totalByteWeightMB / pageWeightMB) * averageCO2ePerNewVisit).toFixed(2);
  };

  const buildQueryURL = (url, key) => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    return `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}&category=performance&key=${key}`;
  };

  const generateUniqueUrl = (id) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `/report/${id}-${timestamp}-${randomString}`;
  };

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage('Running speed test, please wait...');
  
    const inputURL = e.target.url.value;
    const email = e.target.email.value;
  
    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
  
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
  
      const json = await response.json();
      const lighthouseData = json.lighthouseResult;
  
      const totalByteWeightData = lighthouseData.audits['total-byte-weight'];
      const totalByteWeightValue = totalByteWeightData.numericValue;
  
      const co2ePerVisit = calculateCO2ePerNewVisit(totalByteWeightValue);
  
      const pageWeightFormatted = `${(totalByteWeightValue / 1024 / 1024).toFixed(2)} MB`;
      const co2ePerVisitFormatted = `${co2ePerVisit} gm`;
  
      // Save data to Supabase
      const { data, error } = await supabase
        .from('page_speed_data')
        .insert([{ url: inputURL, page_weight: pageWeightFormatted, co2e_per_visit: co2ePerVisitFormatted, email }])
        .select();
  
      if (error || !data || data.length === 0) throw new Error('Error saving data to Supabase');
  
      console.log("Inserted data:", data); // Debugging log
  
      const uniqueUrl = generateUniqueUrl(data[0].id);
      console.log("Generated Unique URL:", uniqueUrl); // Debugging log
  
      // Update Supabase with the unique URL
      await supabase.from('page_speed_data').update({ unique_url: uniqueUrl }).eq('id', data[0].id);


  
      // Send email with the report details
      const emailResponse = await fetch('https://test-two-tau-58.vercel.app/api/send-email', {
       

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  
      if (!emailResponse.ok) throw new Error('Failed to send email');
  
      setLoadingMessage('Data loaded and email sent successfully');
  
      // Ensure valid URL before redirecting
      if (uniqueUrl && typeof uniqueUrl === 'string' && uniqueUrl.startsWith('/report/')) {
        console.log("Redirecting to:", uniqueUrl);
        window.location.href = uniqueUrl;
      } else {
        throw new Error("Invalid unique URL generated");
      }
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
            <TextField id="url" name="url" type="text" label="Enter URL to Test Page Speed" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="email" name="email" type="email" label="Enter your Email" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="device"
              name="device"
              label="Device"
              value="Desktop"
              fullWidth
              InputProps={{ readOnly: true }}
            />
            </Grid>

          <Grid item xs={12} sm={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
          </Grid>
        </Grid>
      </form>
      <p id="loading">{loadingMessage}</p>
      {isLoading ? <LinearProgress /> : isDataLoaded && (
        <div className={`container ${selectedLayoutClass}`} id="results">
          <Divider />
          <div>
            <h3>Your unique report URL:</h3>
            <a href={generatedUrl} target="_blank" rel="noopener noreferrer">{generatedUrl}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageSpeedInsights;
