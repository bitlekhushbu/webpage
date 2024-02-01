import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

Chart.register(CategoryScale);

const PageSpeedInsights = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  
  const [screenshot, setScreenshot] = useState('');
  const [thumbnailData, setthumbnailData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('desktop'); // Added state for device selection
  const [unsizedImagesData, setUnsizedImagesData] = useState({}); 
  const [unusedCssData, setUnusedCssData] = useState({});// Add state for unused-css
  const [unminifiedJavascriptData, setUnminifiedJavascriptData] = useState({}); // Add state for unminified-javascript
  const [unusedJavascriptData, setUnusedJavascriptData] = useState({}); // Add state for unused-javascript
  const [unminifiedCssData, setUnminifiedCSSData] = useState({}); // Add state for unminified-javascript
  const [thirdPartySummaryData, setThirdPartySummaryData] = useState({});
  const [usesResponsiveImagesData, setUsesResponsiveImagesData] = useState({});
  const [offscreenImagesData, setOffscreenImagesData] = useState({});
  // Set state for Minimize Render-Blocking Resources
  const [renderBlockingResourcesData, setRenderBlockingResourcesData] = useState({});
  // Set state for Main-Thread Work Breakdown
  const [mainThreadWorkBreakdownData, setMainThreadWorkBreakdownData] = useState({});
  // Set state for DOM Size
  const [domSizeData, setDomSizeData] = useState({});
  // Set state for Modern Image Formats
  const [modernImageFormatsData, setModernImageFormatsData] = useState({});
  // Set state for Uses Long Cache TTL
  const [longCacheTTLData, setLongCacheTTLData] = useState({});
  // Set state for font-display
  const [fontDisplayData, setFontDisplayData] = useState({});
  // Set state for uses-passive-event-listeners
  const [usesPassiveEventListenersData, setUsesPassiveEventListenersData] = useState({});
  // Set state for uses-optimized-images
  const [usesOptimizedImagesData, setUsesOptimizedImagesData] = useState({});
  // Set state for total-byte-weight
  const [totalByteWeightData, setTotalByteWeightData] = useState({});  
  // Set state for long-tasks
  const [longTasksData, setLongTasksData] = useState({});
  // Set state for layout-shift-elements
  const [layoutShiftElementsData, setLayoutShiftElementsData] = useState({});
  // Set state for user-timings
  const [userTimingsData, setUserTimingsData] = useState({});
  // Set state for server-response-time
  const [serverResponseTimeData, setServerResponseTimeData] = useState({});
  // Set state for critical-request-chains
  const [criticalRequestChainsData, setCriticalRequestChainsData] = useState({});
  // Set state for network-requests
  const [networkRequestsData, setNetworkRequestsData] = useState({});
  
  const apiKey = "AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg";
  

   
  const resultSections = [
    { data: unminifiedCssData, title: "Unminified CSS" },
    { data: unminifiedJavascriptData, title: "Unminified JavaScript" },
    { data: unsizedImagesData, title: "Image elements do not have explicit `width` and `height`" },
    { data: unusedCssData, title: "Reduce unused CSS" },
    { data: unusedJavascriptData, title: "Reduce unused JavaScript" },
    { data: thirdPartySummaryData, title: "Reduce the impact of third-party code" },
    { data: offscreenImagesData, title: "Defer offscreen images" },
    { data: usesResponsiveImagesData, title: "Properly size images" },
    { data: renderBlockingResourcesData, title: "Eliminate render-blocking resources" },
    { data: mainThreadWorkBreakdownData, title: "Minimize main-thread work" },
    { data: domSizeData, title: "Avoid an excessive DOM size" },
    { data: modernImageFormatsData, title: "Serve images in next-gen formats" },
    { data: longCacheTTLData, title: "Serve static assets with an efficient cache policy" },
    { data: fontDisplayData, title: "Ensure text remains visible during webfont load" },
    { data: usesPassiveEventListenersData, title: "Does not use passive listeners to improve scrolling performance" },
    { data: usesOptimizedImagesData, title: "Efficiently encode images" },
    { data: totalByteWeightData, title: "Avoid enormous network payloads" },
    { data: longTasksData, title: "Avoid long main-thread tasks" },
    { data: layoutShiftElementsData, title: "Avoid large layout shifts" },
    { data: userTimingsData, title: "User Timing marks and measures" },
    { data: serverResponseTimeData, title: "Server Response Time" },
    { data: criticalRequestChainsData, title: "Avoid chaining critical requests" },
    { data: networkRequestsData, title: "Network Requests" },
    // Add more result sections as needed
  ];
  const sortedResultSections = resultSections.sort((a, b) => {
    if (a.data.score === null || a.data.score === undefined) return 1;
    if (b.data.score === null || b.data.score === undefined) return -1;
    return a.data.score - b.data.score;
  });
  
 

  const renderResultDetails = (resultSection) => {
    switch (resultSection.title) {
      case "Unminified CSS":
        return (
          <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
        );

      case "Unminified JavaScript":
        return (
          <ul>
            {resultSection.data.items && resultSection.data.items.map((item, index) => (
              <li key={index}>
                <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
                <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
                <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
              </li>
            ))}
          </ul>
        );

        case "Image elements do not have explicit `width` and `height`":
      return (
        <ul>
        {resultSection.data.items && resultSection.data.items.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Path: {item.path}</p>
            <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </li>
        ))}
      </ul>
      );

    case "Reduce unused CSS":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
            <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Reduce unused JavaScript":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Reduce the impact of third-party code":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>Third Party: {item.thirdParty}</p>
              <p>Transfer Size: {bytesToKiB(item.transferSize)} KiB</p>
              <p>Main Thread Time: {item.mainThreadTime} ms</p>
            </li>
          ))}
        </ul>
      );
      
      case "Defer offscreen images":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Properly size images":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Eliminate render-blocking resources":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Wasted Milliseconds: {item.wastedMs} ms</p>
            </li>
          ))}
        </ul>
      );

      case "Minimize main-thread work":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>Category: {item.groupLabel}</p>
              <p>Duration: {item.duration.toFixed(0)} ms</p>
            </li>
          ))}
        </ul>
      );

      case "Avoid an excessive DOM size":
      return (
        <ul>
          {resultSection.data.details && resultSection.data.details.map((item, index) => (
            <li key={index}>
              <p>Statistic: {item.statistic}</p>
              <p>Node: {item.node ? item.node.selector : 'N/A'}</p>
              <p>Value: {item.value}</p>
            </li>
          ))}
        </ul>
      );

      case "Serve images in next-gen formats":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {item.totalBytes} bytes</p>
              <p>Potential Savings: {item.wastedBytes} bytes</p>
              {/* Add additional information from item.node if needed */}
            </li>
          ))}
        </ul>
      );

      case "Serve static assets with an efficient cache policy":
      return (
       
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Cache Lifetime</th>
                </tr>
              </thead>
              <tbody>
                {resultSection.data.items && resultSection.data.items.map((item, index) => (
                  <tr key={index}>
                    <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                    <td>{item.cacheLifetimeMs} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
      );

      case "Ensure text remains visible during webfont load":
      return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Potential Savings (ms)</th>
            </tr>
          </thead>
          <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
              <tr key={index}>
                <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                <td>{item.wastedMs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );


      case "Does not use passive listeners to improve scrolling performance":
      return (
     
        <table>
            <thead>
              <tr>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <p>URL: <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.url}</a></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Efficiently encode images":
      return (
        <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Resource Size</th>
            <th>Potential Savings</th>
          </tr>
        </thead>
        <tbody>
         {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
              <td>{item.totalBytes} bytes</td>
              <td>{item.wastedBytes} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );

      case "Avoid enormous network payloads":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Transfer Size</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.totalBytes} bytes</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Avoid long main-thread tasks":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Start Time (ms)</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.startTime}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Avoid large layout shifts":
      return (
        <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Weighted Score</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.node && item.node.nodeLabel}</td>
                  <td>{item.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      );


      case "User Timing marks and measures":
      return (
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Start Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.timingType}</td>
                  <td>{item.startTime} ms</td>
                  <td>{item.duration} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );


      case "Initial server response time was short":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Time Spent (ms)</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.items && resultSection.data.items.map((item, index) => (
                <tr key={index}>
                  <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                  <td>{item.responseTime} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );

      case "Network Requests":

      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Resource Type</th>
                <th>Resource Size</th>
                <th>Network Request Time</th>
                <th>Priority</th>
                
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details &&
              resultSection.data.details.items
                .sort((a, b) => {
                  if (a.priority === "Low" && b.priority !== "Low") {
                    return -1; // Low priority comes first
                  } else if (a.priority !== "Low" && b.priority === "Low") {
                    return 1; // Non-Low priority comes first
                  } else if (a.priority === "Low" && b.priority === "Low") {
                    // If both are Low priority, sort by resource size in descending order
                    return b.resourceSize - a.resourceSize;
                  } else {
                    // If priorities are the same, sort by resource size in ascending order
                    return a.resourceSize - b.resourceSize;
                  }
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a target="_blank" href={item.url} rel="noreferrer">
                        {item.url}
                      </a>
                    </td>
                    <td>{item.resourceType}</td>
                    <td>{item.resourceSize}</td>
                    <td>{item.networkRequestTime}</td>
                    <td>{item.priority}</td>
                  </tr>
                ))}
            </tbody>
          </table>
      );

      // Add cases for other result sections

      default:
        return null; // Default case, no specific details to render
    }
  };


 

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();

    const inputURL = e.target.url.value;
    setLoadingMessage("Please wait...Running...");

    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
      const json = await response.json();

  

      const lighthouseData = json.lighthouseResult;

      // Display information for "thumbnails"
        const thirdPartyItems = lighthouseData.audits["screenshot-thumbnails"].details.items;
                
        // Extract information from screenshot-thumbnails items
        const thirdPartyJavascriptData = {

          items: thirdPartyItems.map(item => ({
          data: item.data,


          }))
        };

        setthumbnailData(thirdPartyJavascriptData);

        

       /****************START: Image elements do not have explicit `width` and `height`****************/


      // Display information for "unsized-images" similarly to unminified-javascript
    const unsizedImagesItems = lighthouseData.audits["unsized-images"].details.items;
    console.log(unsizedImagesItems);


    // Extract URLs from unsized-images items
    const imageDetails = unsizedImagesItems.map(item => (
      {
        title: item.node.nodeLabel,
        url: item.url,
        path: item.node.snippet.match(/src="([^"]*)"/)[1]
      }
    ));


    const unsizedImagesData = {
      title: lighthouseData.audits["unsized-images"].title,
      description: lighthouseData.audits["unsized-images"].description,
      items: imageDetails
    };


    setUnsizedImagesData(unsizedImagesData);


    /****************END: Image elements do not have explicit `width` and `height`****************/


        /****************START: Minify JS****************/


         // Display information for "unminified-javascript"
      const unminifiedJavascriptItems = lighthouseData.audits["unminified-javascript"].details.items;
      console.log(unminifiedJavascriptItems);


      // Extract information from unminified-javascript items
      const unminifiedJavascriptData = {
        title: lighthouseData.audits["unminified-javascript"].title,
        description: lighthouseData.audits["unminified-javascript"].description,
        score: lighthouseData.audits["unminified-javascript"].score,
        displayValue: lighthouseData.audits["unminified-javascript"].displayValue,
        items: unminifiedJavascriptItems.map(item => ({
          url: item.url,
          totalBytes: item.totalBytes,
          wastedBytes: item.wastedBytes,
        }))
      };


      setUnminifiedJavascriptData(unminifiedJavascriptData);
     
      /****************END: Minify JS****************/


        /****************START: Minify CSS****************/


         // Display information for "unminified-css"
      const unminifiedCssItems = lighthouseData.audits["unminified-css"].details.items;
      console.log(unminifiedCssItems);


      // Extract information from unminified-css items
      const unminifiedCssData = {
        title: lighthouseData.audits["unminified-css"].title,
        description: lighthouseData.audits["unminified-css"].description,
        score: lighthouseData.audits["unminified-css"].score,
        displayValue: lighthouseData.audits["unminified-css"].displayValue,
        items: unminifiedCssItems.map(item => ({
          url: item.url,
          totalBytes: item.totalBytes,
          wastedBytes: item.wastedBytes,
        }))
      };


      setUnminifiedCSSData(unminifiedCssData);
     
      /****************END: Minify CSS****************/


 /****************Start: Reduce unused CSS****************/


// Extract information from unused-javascript items
const unusedCssItems = json.lighthouseResult.audits["unused-css-rules"].details.items;
const unusedCssData = {
  title: json.lighthouseResult.audits["unused-css-rules"].title,
  description: json.lighthouseResult.audits["unused-css-rules"].description,
  score: json.lighthouseResult.audits["unused-css-rules"].score,
  displayValue: json.lighthouseResult.audits["unused-css-rules"].displayValue,
  items: unusedCssItems.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  }))
};


setUnusedCssData(unusedCssData);


/****************End : Reduce unused CSS****************/

/****************Start: Reduce unused JavaScript****************/


// Extract information from unused-javascript items
const unusedJavascriptItems = json.lighthouseResult.audits["unused-javascript"].details.items;
const unusedJavascriptData = {
  title: json.lighthouseResult.audits["unused-javascript"].title,
  description: json.lighthouseResult.audits["unused-javascript"].description,
  score: json.lighthouseResult.audits["unused-javascript"].score,
  displayValue: json.lighthouseResult.audits["unused-javascript"].displayValue,
  items: unusedJavascriptItems.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  }))
};


setUnusedJavascriptData(unusedJavascriptData);


/****************End : Reduce unused JavaScript****************/


// Display information for "third-party-summary"
const thirdPartySummaryData = lighthouseData.audits["third-party-summary"];
console.log(thirdPartySummaryData);

// Extract information from third-party-summary
const thirdPartySummary = {
  title: thirdPartySummaryData.title,
  description: thirdPartySummaryData.description,
  score: thirdPartySummaryData.score,
  displayValue: thirdPartySummaryData.displayValue,
  items: thirdPartySummaryData.details.items.map(item => ({
    thirdParty: item.thirdParty,
    transferSize: item.transferSize,
    mainThreadTime: item.mainThreadTime,
  })),
};

setThirdPartySummaryData(thirdPartySummary);


// Display information for "offscreen-images"
const offscreenImagesData = lighthouseData.audits["offscreen-images"];
console.log(offscreenImagesData);

// Extract information from offscreen-images
const offscreenImages = {
  title: offscreenImagesData.title,
  description: offscreenImagesData.description,
  score: offscreenImagesData.score,
  displayValue: offscreenImagesData.displayValue,
  items: offscreenImagesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  })),
};


setOffscreenImagesData(offscreenImages);

// Display information for "uses-responsive-images"
const usesResponsiveImagesData = lighthouseData.audits["uses-responsive-images"];
console.log(usesResponsiveImagesData);

// Extract information from uses-responsive-images
const usesResponsiveImages = {
  title: usesResponsiveImagesData.title,
  description: usesResponsiveImagesData.description,
  score: usesResponsiveImagesData.score,
  displayValue: usesResponsiveImagesData.displayValue,
  items: usesResponsiveImagesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  })),
};



setUsesResponsiveImagesData(usesResponsiveImages);


// Display information for "Minimize Render-Blocking Resources"
const renderBlockingResourcesData = lighthouseData.audits["render-blocking-resources"];
console.log(renderBlockingResourcesData);

// Extract information from Minimize Render-Blocking Resources
const renderBlockingResources = {
  title: renderBlockingResourcesData.title,
  description: renderBlockingResourcesData.description,
  score: renderBlockingResourcesData.score,
  displayValue: renderBlockingResourcesData.displayValue,
  items: renderBlockingResourcesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedMs: item.wastedMs,
  })),
};


setRenderBlockingResourcesData(renderBlockingResources);

// Display information for "Main-Thread Work Breakdown"
const mainThreadWorkBreakdownData = lighthouseData.audits["mainthread-work-breakdown"];
console.log(mainThreadWorkBreakdownData);

// Extract information from Main-Thread Work Breakdown
const mainThreadWorkBreakdown = {
  title: mainThreadWorkBreakdownData.title,
  description: mainThreadWorkBreakdownData.description,
  score: mainThreadWorkBreakdownData.score,
  displayValue: mainThreadWorkBreakdownData.displayValue,
  items: mainThreadWorkBreakdownData.details.items.map(item => ({
    groupLabel: item.groupLabel,
    duration: item.duration,
  })),
};


setMainThreadWorkBreakdownData(mainThreadWorkBreakdown);

// Display information for "DOM Size"
const domSizeData = lighthouseData.audits["dom-size"];
console.log(domSizeData);

// Extract information from DOM Size
const domSize = {
  title: domSizeData.title,
  description: domSizeData.description,
  score: domSizeData.score,
  displayValue: domSizeData.displayValue,
  numericValue: domSizeData.numericValue,
  numericUnit: domSizeData.numericUnit,
  details: domSizeData.details.items.map(item => ({
    statistic: item.statistic,
    node: item.node,
    value: item.value.value,
  })),
};

setDomSizeData(domSize);


// Display information for "Modern Image Formats"
const modernImageFormatsData = lighthouseData.audits["modern-image-formats"];
console.log(modernImageFormatsData);

// Extract information from Modern Image Formats
const modernImageFormats = {
  title: modernImageFormatsData.title,
  description: modernImageFormatsData.description,
  score: modernImageFormatsData.score,
  scoreDisplayMode: modernImageFormatsData.scoreDisplayMode,
  displayValue: modernImageFormatsData.displayValue,
  numericValue: modernImageFormatsData.numericValue,
  numericUnit: modernImageFormatsData.numericUnit,
  details: modernImageFormatsData.details,
  items: modernImageFormatsData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
    node: item.node,
  })),
};


setModernImageFormatsData(modernImageFormats);


// Display information for "Uses Long Cache TTL"
const longCacheTTLData = lighthouseData.audits["uses-long-cache-ttl"];
console.log(longCacheTTLData);

// Extract information from Uses Long Cache TTL
const longCacheTTL = {
  title: longCacheTTLData.title,
  description: longCacheTTLData.description,
  score: longCacheTTLData.score,
  scoreDisplayMode: longCacheTTLData.scoreDisplayMode,
  displayValue: longCacheTTLData.displayValue,
  numericValue: longCacheTTLData.numericValue,
  numericUnit: longCacheTTLData.numericUnit,
  details: longCacheTTLData.details,
  items: longCacheTTLData.details.items.map(item => ({
    url: item.url,
    cacheLifetimeMs: item.cacheLifetimeMs,
  })),
};


setLongCacheTTLData(longCacheTTL);


// Display information for "font-display"
const fontDisplayData = lighthouseData.audits["font-display"];
console.log(fontDisplayData);

// Extract information from font-display
const fontDisplay = {
  title: fontDisplayData.title,
  description: fontDisplayData.description,
  score: fontDisplayData.score,
  scoreDisplayMode: fontDisplayData.scoreDisplayMode,
  details: fontDisplayData.details,
};


setFontDisplayData(fontDisplay);


// Display information for "uses-passive-event-listeners"
const usesPassiveEventListenersData = lighthouseData.audits["uses-passive-event-listeners"];
console.log(usesPassiveEventListenersData);

// Extract information from uses-passive-event-listeners
const usesPassiveEventListeners = {
  title: usesPassiveEventListenersData.title,
  description: usesPassiveEventListenersData.description,
  score: usesPassiveEventListenersData.score,
  scoreDisplayMode: usesPassiveEventListenersData.scoreDisplayMode,
  details: usesPassiveEventListenersData.details,
};


setUsesPassiveEventListenersData(usesPassiveEventListeners);

// Display information for "uses-optimized-images"
const usesOptimizedImagesData = lighthouseData.audits["uses-optimized-images"];
console.log(usesOptimizedImagesData);

// Extract information from uses-optimized-images
const usesOptimizedImages = {
  title: usesOptimizedImagesData.title,
  description: usesOptimizedImagesData.description,
  score: usesOptimizedImagesData.score,
  scoreDisplayMode: usesOptimizedImagesData.scoreDisplayMode,
  displayValue: usesOptimizedImagesData.displayValue,
  numericValue: usesOptimizedImagesData.numericValue,
  numericUnit: usesOptimizedImagesData.numericUnit,
  details: usesOptimizedImagesData.details,
};


setUsesOptimizedImagesData(usesOptimizedImages);


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



// Display information for "long-tasks"
const longTasksData = lighthouseData.audits["long-tasks"];
console.log(longTasksData);

// Extract information from long-tasks
const longTasks = {
  title: longTasksData.title,
  description: longTasksData.description,
  score: longTasksData.score,
  scoreDisplayMode: longTasksData.scoreDisplayMode,
  displayValue: longTasksData.displayValue,
  details: longTasksData.details,
};


setLongTasksData(longTasks);



// Display information for "layout-shift-elements"
const layoutShiftElementsData = lighthouseData.audits["layout-shift-elements"];
console.log(layoutShiftElementsData);

// Extract information from layout-shift-elements
const layoutShiftElements = {
  title: layoutShiftElementsData.title,
  description: layoutShiftElementsData.description,
  score: layoutShiftElementsData.score,
  scoreDisplayMode: layoutShiftElementsData.scoreDisplayMode,
  displayValue: layoutShiftElementsData.displayValue,
  numericValue: layoutShiftElementsData.numericValue,
  numericUnit: layoutShiftElementsData.numericUnit,
  details: layoutShiftElementsData.details,
};


setLayoutShiftElementsData(layoutShiftElements);


// Display information for "user-timings"
const userTimingsData = lighthouseData.audits["user-timings"];
console.log(userTimingsData);

// Extract information from user-timings
const userTimings = {
  title: userTimingsData.title,
  description: userTimingsData.description,
  score: userTimingsData.score,
  scoreDisplayMode: userTimingsData.scoreDisplayMode,
  displayValue: userTimingsData.displayValue,
  details: userTimingsData.details,
};


setUserTimingsData(userTimings);

// Display information for "server-response-time"
const serverResponseTimeData = lighthouseData.audits["server-response-time"];
console.log(serverResponseTimeData);

// Extract information from server-response-time
const serverResponseTime = {
  title: serverResponseTimeData.title,
  description: serverResponseTimeData.description,
  score: serverResponseTimeData.score,
  scoreDisplayMode: serverResponseTimeData.scoreDisplayMode,
  displayValue: serverResponseTimeData.displayValue,
  numericValue: serverResponseTimeData.numericValue,
  numericUnit: serverResponseTimeData.numericUnit,
  details: serverResponseTimeData.details,
};


setServerResponseTimeData(serverResponseTime);


// Display information for "critical-request-chains"
const criticalRequestChainsData = lighthouseData.audits["critical-request-chains"];
console.log(criticalRequestChainsData);

// Extract information from critical-request-chains
const criticalRequestChains = {
  title: criticalRequestChainsData.title,
  description: criticalRequestChainsData.description,
  score: criticalRequestChainsData.score,
  scoreDisplayMode: criticalRequestChainsData.scoreDisplayMode,
  displayValue: criticalRequestChainsData.displayValue,
  details: criticalRequestChainsData.details,
};

setCriticalRequestChainsData(criticalRequestChains);

// Display information for "network-requests"
const networkRequestsData = lighthouseData.audits["network-requests"];
console.log(networkRequestsData);

// Extract information from network-requests
const networkRequests = {
  title: networkRequestsData.title,
  description: networkRequestsData.description,
  score: networkRequestsData.score,
  scoreDisplayMode: networkRequestsData.scoreDisplayMode,
  displayValue: networkRequestsData.displayValue,
  details: networkRequestsData.details,
};

setNetworkRequestsData(networkRequests);




      const lighthouseMetricsData = {
        'Performance': lighthouseData.categories.performance.score * 100,
        'Timing': lighthouseData.timing.total,
        'Total Blocking Time': lighthouseData.audits['total-blocking-time'].displayValue.replace(/,/g, ''),
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
        // 'Total JavaScript Size': lighthouseData.audits['total-javascript-size'].numericValue,
        // 'Render Blocking Resources': lighthouseData.audits['render-blocking-resources'].numericValue,
        
      };

      setLighthouseMetrics(lighthouseMetricsData);
      showFullPageScreenshot(lighthouseData.fullPageScreenshot);

    setTimeout(() => {
        // Once data is loaded, set isDataLoaded to true
        setIsDataLoaded(true);
        setLoadingMessage('Data loaded successfully');
      }, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingMessage("An error occurred while fetching data.");
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
  

  const showFullPageScreenshot = (screenshotData) => {
    setScreenshot(screenshotData.screenshot.data);
  };

  const renderTable = (metrics) => {
    const fcpValue = metrics['First Contentful Paint'];
    const lcpValue = metrics['Largest Contentful Paint'];
    const speedIndexValue = metrics['Speed Index'];
    const clsValue = metrics['Cumulative Layout Shift'];
    const tbtValue = metrics['Total Blocking Time'];
 
    const fcpCategory = categorizeFCP(parseFloat(fcpValue));
    const lcpCategory = categorizeLCP(parseFloat(lcpValue));
    const speedIndexCategory = categorizeSpeedIndex(parseFloat(speedIndexValue));
    const clsCategory = categorizeCLS(parseFloat(clsValue));
    const tbtCategory = categorizeTBT(parseFloat(tbtValue));

    console.log('Latest value one', fcpValue);
 
    return (
      <table>
        <thead>
          <tr>
            <th>Metrics</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(metrics).map((key, index) => {
            const colorCategory =
                key === 'Total Blocking Time'
                ? tbtCategory
                : key === 'First Contentful Paint'
                ? fcpCategory
                : key === 'Largest Contentful Paint'
                ? lcpCategory
                : key === 'Speed Index'
                ? speedIndexCategory
                : key === 'Cumulative Layout Shift'
                ? clsCategory
                : '';
 
            const displayValue =
              key === 'Total Blocking Time' ||
              key === 'First Contentful Paint' ||
              key === 'Largest Contentful Paint' ||
              key === 'Speed Index' ||
              key === 'Cumulative Layout Shift'
                ? `${metrics[key]} (${colorCategory})`
                : metrics[key];
 
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  {key === 'Total Blocking Time' ||
                  key === 'First Contentful Paint' ||
                  key === 'Largest Contentful Paint' ||
                  key === 'Speed Index' ||
                  key === 'Cumulative Layout Shift' ? (
                    <span style={{ color: getColorBasedOnCategory(colorCategory) }}>
                      {displayValue}
                    </span>
                  ) : (
                    displayValue
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
 
 


// Function to categorize FCP, LCP, Speed Index, and CLS values
const categorizeTBT = (tbtValue) => {
  if (tbtValue <= 200) {
    return 'Good';
  } else if (tbtValue > 200 && tbtValue <= 600) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};

const categorizeFCP = (fcpValue) => {
  if (fcpValue <= 1800) {
    return 'Good';
  } else if (fcpValue > 1800 && fcpValue <= 3000) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeLCP = (lcpValue) => {
  if (lcpValue <= 2500) {
    return 'Good';
  } else if (lcpValue > 2500 && lcpValue <= 4000) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeSpeedIndex = (speedIndexValue) => {
  if (speedIndexValue <= 3.4) {
    return 'Good';
  } else if (speedIndexValue > 3.4 && speedIndexValue <= 5.8) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeCLS = (clsValue) => {
  if (clsValue <= 0.1) {
    return 'Good';
  } else if (clsValue > 0.1 && clsValue <= 0.25) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


// Function to get color based on category
const getColorBasedOnCategory = (category) => {
  switch (category) {
    case 'Good':
      return 'green';
    case 'Needs Improvement':
      return 'orange';
    case 'Poor':
      return 'red';
    default:
      return '';
  }
};




  const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

  const [carbonFootprint, setCarbonFootprint] = useState(null);

  useEffect(() => {
    if (Object.keys(lighthouseMetrics).length > 0) {
      // Calculate carbon footprint based on total energy consumption (example)
      const totalEnergyConsumption = lighthouseMetrics['Total Byte Weight'] * 0.000001; // Example factor
      const carbonFootprintValue = totalEnergyConsumption * 0.5; // Example carbon intensity factor
      setCarbonFootprint(carbonFootprintValue.toFixed(2));
    }
  }, [lighthouseMetrics]);
  
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
      {isDataLoaded && (
      <div className="container" id="results">
        
        {/* Display 'Performance' metric separately */}
        {lighthouseMetrics['Performance'] !== undefined && (
          <div className="result-section">
            <h2>Overall score</h2>
            <p>
              Performance Score: {lighthouseMetrics['Performance'].toFixed(0)}%.
            </p>
          </div>
        )}
      
        {Object.keys(lighthouseMetrics).length > 0 && (
          <div className="result-section">
            <h2>Lighthouse Results</h2>
            {renderTable(lighthouseMetrics)}
            {/*{renderBarChart(lighthouseMetrics, 'Lighthouse Metrics')}*/}
            <br/>
            <br/>
          </div>
        )}

        {carbonFootprint !== null && (
          <div className="result-section">
            <h2>Carbon Footprint</h2>
            <p>
              Estimated Carbon Footprint: {carbonFootprint} kg CO2e
            </p>
            <br/>
            <br/>
          </div>
        )}

        {Object.keys(thumbnailData).length > 0 && (
          <div className="result-section">
            <h2>Filmstrip</h2>
            <ul style={{display:'flex', listStyle:'none', width:'100%'}}>
              {thumbnailData.items.map((item, index) => (
                <li key={index}>
                <img src={item.data} alt="Full Page Screenshot" />
                </li>
              ))}
            </ul>
            <br/>
            <br/>
          </div>
          )}
          
          {sortedResultSections && (
          <div>
          <h2>Opportunities</h2>
          {sortedResultSections.map((resultSection, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography style={{ color: getScoreColor(resultSection.data.score) }}>{`${index + 1}. ${resultSection.title}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p>{resultSection.data.description}</p>
                  <p>Score: {resultSection.data.score}</p>
                  {/* Render common details for the result section */}
                  {renderResultDetails(resultSection)}
                  {/* ... render other details for the result section */}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
          <br/>
          <br/>
          </div>
        )}
 


        {screenshot && (
          <div className="result-section">
            <h2>Screenshot</h2>
            <img src={screenshot} alt="Full Page Screenshot" />
          </div>
        )}

      
      </div>

      )}
    </div>
    
  );
};




// Function to determine the color based on the score value
const getScoreColor = (score) => {
  if (score === 0) {
    return "red";
  } else if (score === 1) {
    return "green";
  } else if (score === 0.5) {
    return "orange";
  } else {
    return "gray"; // Set a default color if needed
  }
};


export default PageSpeedInsights;
