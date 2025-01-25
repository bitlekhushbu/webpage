import React, { useState } from 'react';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';
import IconButton from '@mui/material/IconButton';   
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, Divider, LinearProgress, CircularProgress, Box, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import {  Tabs, Tab, MenuItem, Button, Grid, Card, CardContent, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TotalByteWeightResults from './TotalByteWeightResults';
const PageSpeedInsights = () => {
const [selectedLayoutClass, setSelectedLayoutClass] = useState('');
const [loadingMessage, setLoadingMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [totalByteWeight, setTotalByteWeight] = useState(0);
const [isDataLoaded, setIsDataLoaded] = useState(false);
const [selectedDevice, setSelectedDevice] = useState('mobile'); // Added state for device selection
const [totalByteWeightData, setTotalByteWeightData] = useState({});  
const apiKey = "AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg";
const calculateCO2ePerNewVisit = (totalByteWeight) => {
console.log("Total New data:",totalByteWeight);
const totalByteWeightMB = totalByteWeight / 1024;
const newTotalByteWeightMB = totalByteWeightMB.toFixed(2);
const pageWeight = 1.8; // Replace this with the actual page weight in MB
const averageCO2ePerNewVisit = 0.6; // Replace this with the actual average CO2e per new visit in gm
// Calculate CO2e per new visit
const co2ePerNewVisit = (newTotalByteWeightMB / (pageWeight * 1024)) * averageCO2ePerNewVisit; // Convert page weight to KiB
return co2ePerNewVisit.toFixed(2)
};
const totalByteWeightMB = totalByteWeight / 1024;
const newTotalByteWeightMB = totalByteWeightMB.toFixed(2);
const resultSections = [
{ Component: TotalByteWeightResults, data: totalByteWeightData, title: "Avoid enormous network payloads", tags: ["LCP"]  },
];
const getPageSpeedInsights = async (e) => {
e.preventDefault();
setIsLoading(true);
const inputURL = e.target.url.value;
setLoadingMessage("Please wait...Running...");
try {
const url = buildQueryURL(inputURL, apiKey);
const response = await fetch(url);
const json = await response.json();
const lighthouseData = json.lighthouseResult;
// Display information for "total-byte-weight"
const totalByteWeightData = lighthouseData.audits["total-byte-weight"];
console.log(totalByteWeightData);
// Extract information from total-byte-weight
const totalByteWeight = {
title: totalByteWeightData.title,
description: totalByteWeightData.description,
score: totalByteWeightData.score,
scoreDisplayMode: totalByteWeightData.scoreDisplayMode,
displayValue: totalByteWeightData.displayValue,
numericValue: totalByteWeightData.numericValue,
numericUnit: totalByteWeightData.numericUnit,
details: totalByteWeightData.details,
};
setTotalByteWeightData(totalByteWeight);
let totalByteWeightKiB = parseFloat(lighthouseData.audits['total-byte-weight'].displayValue.replace(/[^\d.]/g, ''));
let totalByteWeightMB = totalByteWeightKiB / 1024;
let newTotalByteWeightMB = totalByteWeightMB.toFixed(2);
let newTotalByteWeightMBText = `${newTotalByteWeightMB} MB`;
const lighthouseMetricsData = {
'Total Byte Weight': newTotalByteWeightMBText,
};
const totalByteWeightValue = lighthouseData.audits['total-byte-weight'].numericValue;
setTotalByteWeight(totalByteWeightValue);
setSelectedLayoutClass(selectedDevice === 'desktop' ? 'desktop-layout' : 'mobile-layout');
setTimeout(() => {
// Once data is loaded, set isDataLoaded to true
setIsDataLoaded(true);
setLoadingMessage('Data loaded successfully');
setIsLoading(false); // Set isLoading to false when data is loaded
}, 0);
} catch (error) {
console.error("Error fetching data:", error);
setLoadingMessage("An error occurred while fetching data.");
setIsLoading(false); // Set isLoading to false on error
}
};
const buildQueryURL = (url, key) => {
const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
let query = `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}&category=performance`; // Include selected device type
if (key !== "") {
query += `&key=${key}`;
}
return query;
};
const bytesToKiB = (bytes) => {
return (bytes / 1024).toFixed(2);
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
         <Grid item xs={12} sm={3}>
            <TextField
               id="device"
               name="device"
               select
               label="Select Device"
               value={selectedDevice}
               onChange={(e) =>
               setSelectedDevice(e.target.value)}
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
         <Grid item xs={12} sm={6}></Grid>
         <Grid item xs={12} sm={3}>
            <TextField
               id="email"
               name="email"
               type="email"
               label="Enter Email"
               fullWidth
               />
         </Grid>
         <Grid item xs={12} sm={3}>
            <Button variant="contained" color="secondary" fullWidth>
            Send Email
            </Button>
         </Grid>
      </Grid>
   </form>
   <p id="loading">{loadingMessage}</p>
   {isLoading ? (
   <div id="loading">
      {/* Use CircularProgress instead of the loading text */}
      <LinearProgress />
   </div>
   ) : (
   isDataLoaded && (
   <div className={`container ${selectedLayoutClass}`} id="results">
   <Divider />
   <Divider />
   {/* Add the following code to display CO2e per new visit */}
   {totalByteWeight > 0 && (
   <div className="result-section carbon_footprint">
      <h2>Carbon Footprint</h2>
      <div className="main_content">
         <div className="main_item">
            <p>Page Weight</p>
            <h3>{bytesToKiB(newTotalByteWeightMB)} MB</h3>
         </div>
         <div className="main_item">
            <p>CO2e per New Visit</p>
            <h3>{calculateCO2ePerNewVisit(totalByteWeight)} gm</h3>
         </div>
      </div>
   </div>
   )}
   <Divider />
</div>
)
)
}
</div>
);
};
export default PageSpeedInsights;