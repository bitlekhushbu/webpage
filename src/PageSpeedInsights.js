import React, { useState, useEffect } from 'react';
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
  const [thumbnailData, setthumbnailData] = useState({});

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
      <div className="container" id="results">
        {Object.keys(cruxMetrics).length > 0 && (
          <div className="result-section">
           {/* <h2>Chrome User Experience Report Results</h2>*/}
        {/*{renderTable(cruxMetrics)}*/}
          </div>
        )}

        {Object.keys(unminifiedCssData).length > 0 && (
          <div className="result-section">
          <h2>OPPORTUNITIES</h2>
            <h3 style={{ color: getScoreColor(unminifiedCssData.score) }}>1. {unminifiedCssData.title}</h3>
            <p>{unminifiedCssData.description}</p>
            <p>Score: {unminifiedCssData.score}</p>
            <p>Display Value: {unminifiedCssData.displayValue}</p>
            <ul>
              {unminifiedCssData.items.map((item, index) => (
                <li key={index}>
                  <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
                  <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
                  <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
                </li>
              ))}
            </ul>
            <hr/>
          </div>
        )}

        {/* Render unminified-javascript data in the component */}
  {Object.keys(unminifiedJavascriptData).length > 0 && (
    <div className="result-section">
      <h3 style={{ color: getScoreColor(unminifiedJavascriptData.score) }}>2. {unminifiedJavascriptData.title}</h3>
      <p>{unminifiedJavascriptData.description}</p>
      <p>Score: {unminifiedJavascriptData.score}</p>
      <p>Display Value: {unminifiedJavascriptData.displayValue}</p>
      <ul>
        {unminifiedJavascriptData.items.map((item, index) => (
          <li key={index}>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
            <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  )}


  {/* Render unsized images data in the component */}
{Object.keys(unsizedImagesData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(unsizedImagesData.score) }}>3. {unsizedImagesData.title}</h3>
    <p>{unsizedImagesData.description}</p>
    <p>Score: {unsizedImagesData.score}</p>
    <ul>
      {unsizedImagesData.items.map((item, index) => (
        <li key={index}>
          <p>{item.title}</p>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Path: {item.path}</p>
          <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </li>
      ))}
    </ul>
    <hr/>
  </div>
)}


{/* Render passive event listeners data in the component */}
{Object.keys(unusedCssData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(unusedCssData.score) }}>4. {unusedCssData.title}</h3>
    <p>{unusedCssData.description}</p>
    <p>Score: {unusedCssData.score}</p>
    <p>Display Value: {unusedCssData.displayValue}</p>
    <ul>
      {unusedCssData.items.map((item, index) => (
        <li key={index}>
        <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
        <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
        <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
        </li>
      ))}
    </ul>
    <hr/>
  </div>
)}
{/* Render Reduce unused JavaScript */}


{Object.keys(unusedJavascriptData).length > 0 && (
    <div className="result-section">
      <h3 style={{ color: getScoreColor(unusedJavascriptData.score) }}>5. {unusedJavascriptData.title}</h3>
      <p>{unusedJavascriptData.description}</p>
      <p>Score: {unusedJavascriptData.score}</p>
      <p>Display Value: {unusedJavascriptData.displayValue}</p>
      <ul>
        {unusedJavascriptData.items.map((item, index) => (
          <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
            <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  )}

{/* Render third-party-summary data */}
{Object.keys(thirdPartySummaryData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(thirdPartySummaryData.score) }} >6. {thirdPartySummaryData.title}</h3>
    <p>{thirdPartySummaryData.description}</p>
    <p>Score: {thirdPartySummaryData.score}</p>
    <p>Display Value: {thirdPartySummaryData.displayValue}</p>
    <ul>
      {thirdPartySummaryData.items.map((item, index) => (
        <li key={index}>
          <p>Third Party: {item.thirdParty}</p>
          <p>Transfer Size: {bytesToKiB(item.transferSize)} KiB</p>
          <p>Main Thread Time: {item.mainThreadTime} ms</p>
        </li>
      ))}
    </ul>
    <hr />
  </div>
)}

{Object.keys(offscreenImagesData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(offscreenImagesData.score) }}>7. {offscreenImagesData.title}</h3>
    <p>{offscreenImagesData.description}</p>
    <p>Score: {offscreenImagesData.score}</p>
    <p>Display Value: {offscreenImagesData.displayValue}</p>
    <ul>
      {offscreenImagesData.items.map((item, index) => (
        <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
          <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
        </li>
      ))}
    </ul>
    <hr />
  </div>
)}

{Object.keys(usesResponsiveImagesData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(usesResponsiveImagesData.score) }}>8. {usesResponsiveImagesData.title}</h3>
    <p>{usesResponsiveImagesData.description}</p>
    <p>Score: {usesResponsiveImagesData.score}</p>
    <p>Display Value: {usesResponsiveImagesData.displayValue}</p>
    <ul>
      {usesResponsiveImagesData.items.map((item, index) => (
        <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
          <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
        </li>
      ))}
    </ul>
    <hr/>
  </div>
)}
  

{Object.keys(renderBlockingResourcesData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(renderBlockingResourcesData.score) }}>9. {renderBlockingResourcesData.title}</h3>
    <p>{renderBlockingResourcesData.description}</p>
    <p>Score: {renderBlockingResourcesData.score}</p>
    <p>Display Value: {renderBlockingResourcesData.displayValue}</p>
    <ul>
      {renderBlockingResourcesData.items.map((item, index) => (
        <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Total Bytes: {bytesToKiB(item.totalBytes)} KiB</p>
          <p>Wasted Milliseconds: {item.wastedMs} ms</p>
        </li>
      ))}
    </ul>
    <hr/>
  </div>
)}


{Object.keys(mainThreadWorkBreakdownData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(mainThreadWorkBreakdownData.score) }}>10. {mainThreadWorkBreakdownData.title}</h3>
    <p>{mainThreadWorkBreakdownData.description}</p>
    <p>Score: {mainThreadWorkBreakdownData.score}</p>
    <p>Display Value: {mainThreadWorkBreakdownData.displayValue}</p>
    <ul>
      {mainThreadWorkBreakdownData.items.map((item, index) => (
        <li key={index}>
          <p>Category: {item.groupLabel}</p>
          <p>Duration: {item.duration.toFixed(0)} ms</p>
        </li>
      ))}
    </ul>
    <hr />
  </div>
)}



{Object.keys(domSizeData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(domSizeData.score) }}>11. {domSizeData.title}</h3>
    <p>{domSizeData.description}</p>
    <p>Score: {domSizeData.score}</p>
    <p>Display Value: {domSizeData.displayValue}</p>
    <p>Numeric Value: {domSizeData.numericValue} {domSizeData.numericUnit}</p>
    <ul>
      {domSizeData.details.map((item, index) => (
        <li key={index}>
          <p>Statistic: {item.statistic}</p>
          <p>Node: {item.node ? item.node.selector : 'N/A'}</p>
          <p>Value: {item.value}</p>
        </li>
      ))}
    </ul>
    <hr />
  </div>
)}


{Object.keys(modernImageFormatsData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(modernImageFormatsData.score) }}>12. {modernImageFormatsData.title}</h3>
    <p>{modernImageFormatsData.description}</p>
    <p>Score: {modernImageFormatsData.score}</p>
    <p>Score Display Mode: {modernImageFormatsData.scoreDisplayMode}</p>
    <p>Display Value: {modernImageFormatsData.displayValue}</p>
    <p>Numeric Value: {modernImageFormatsData.numericValue} {modernImageFormatsData.numericUnit}</p>
    <p>Overall Savings: {modernImageFormatsData.details.overallSavingsBytes} bytes</p>
    <ul>
      {modernImageFormatsData.items.map((item, index) => (
        <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Total Bytes: {item.totalBytes} bytes</p>
          <p>Potential Savings: {item.wastedBytes} bytes</p>
          {/* Add additional information from item.node if needed */}
        </li>
      ))}
    </ul>
    <hr />
  </div>
)}



{Object.keys(longCacheTTLData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(longCacheTTLData.score) }}>13. {longCacheTTLData.title}</h3>
    <p>{longCacheTTLData.description}</p>
    <p>Score: {longCacheTTLData.score}</p>
    <p>Score Display Mode: {longCacheTTLData.scoreDisplayMode}</p>
    <p>Display Value: {longCacheTTLData.displayValue}</p>
    <p>Numeric Value: {longCacheTTLData.numericValue} {longCacheTTLData.numericUnit}</p>
    {longCacheTTLData.items && longCacheTTLData.items.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Cache Lifetime</th>
          </tr>
        </thead>
        <tbody>
          {longCacheTTLData.items.map((item, index) => (
            <tr key={index}>
              <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
              <td>{item.cacheLifetimeMs} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <hr />
  </div>
)}

{Object.keys(fontDisplayData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(fontDisplayData.score) }}>14. {fontDisplayData.title}</h3>
    <p>{fontDisplayData.description}</p>
    <p>Score: {fontDisplayData.score}</p>
    <p>Score Display Mode: {fontDisplayData.scoreDisplayMode}</p>
    {fontDisplayData.details && (
      <div>
        <h3>Details:</h3>
        {fontDisplayData.details.items && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Potential Savings (ms)</th>
              </tr>
            </thead>
            <tbody>
              {fontDisplayData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.wastedMs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(usesPassiveEventListenersData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(usesPassiveEventListenersData.score) }}>15. {usesPassiveEventListenersData.title}</h3>
    <p>{usesPassiveEventListenersData.description}</p>
    <p>Score: {usesPassiveEventListenersData.score}</p>
    <p>Score Display Mode: {usesPassiveEventListenersData.scoreDisplayMode}</p>
    {usesPassiveEventListenersData.details && (
      <div>
        <h3>Details:</h3>
        {usesPassiveEventListenersData.details.items && (
          <table>
            <thead>
              <tr>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {usesPassiveEventListenersData.details.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <p>URL: <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.url}</a></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(usesOptimizedImagesData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(usesOptimizedImagesData.score) }}>16. {usesOptimizedImagesData.title}</h3>
    <p>{usesOptimizedImagesData.description}</p>
    <p>Score: {usesOptimizedImagesData.score}</p>
    <p>Score Display Mode: {usesOptimizedImagesData.scoreDisplayMode}</p>
    <p>Display Value: {usesOptimizedImagesData.displayValue}</p>
    <p>Numeric Value: {usesOptimizedImagesData.numericValue} {usesOptimizedImagesData.numericUnit}</p>
    {usesOptimizedImagesData.details && (
      <div>
        <h3>Details:</h3>
        {usesOptimizedImagesData.details.items && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Resource Size</th>
                <th>Potential Savings</th>
              </tr>
            </thead>
            <tbody>
              {usesOptimizedImagesData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.totalBytes} bytes</td>
                  <td>{item.wastedBytes} bytes</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}


{Object.keys(totalByteWeightData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(totalByteWeightData.score) }}>17. {totalByteWeightData.title}</h3>
    <p>{totalByteWeightData.description}</p>
    <p>Score: {totalByteWeightData.score}</p>
    <p>Score Display Mode: {totalByteWeightData.scoreDisplayMode}</p>
    <p>Display Value: {totalByteWeightData.displayValue}</p>
    <p>Numeric Value: {totalByteWeightData.numericValue} {totalByteWeightData.numericUnit}</p>
    {totalByteWeightData.details && (
      <div>
        <h3>Details:</h3>
        {totalByteWeightData.details.items && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Transfer Size</th>
              </tr>
            </thead>
            <tbody>
              {totalByteWeightData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.totalBytes} bytes</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(longTasksData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(longTasksData.score) }}>18. {longTasksData.title}</h3>
    <p>{longTasksData.description}</p>
    <p>Score: {longTasksData.score}</p>
    <p>Score Display Mode: {longTasksData.scoreDisplayMode}</p>
    <p>{longTasksData.displayValue}</p>
    {longTasksData.details && (
      <div>
        <h3>Details:</h3>
        {longTasksData.details.items && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Start Time (ms)</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
              {longTasksData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.startTime}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}


{Object.keys(layoutShiftElementsData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(layoutShiftElementsData.score) }}>19. {layoutShiftElementsData.title}</h3>
    <p>{layoutShiftElementsData.description}</p>
    <p>Score: {layoutShiftElementsData.score}</p>
    <p>Score Display Mode: {layoutShiftElementsData.scoreDisplayMode}</p>
    <p>Display Value: {layoutShiftElementsData.displayValue}</p>
    <p>Numeric Value: {layoutShiftElementsData.numericValue} {layoutShiftElementsData.numericUnit}</p>
    {layoutShiftElementsData.details && (
      <div>
        <h3>Details:</h3>
        {layoutShiftElementsData.details.items && (
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Weighted Score</th>
              </tr>
            </thead>
            <tbody>
              {layoutShiftElementsData.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.node && item.node.nodeLabel}</td>
                  <td>{item.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}


{Object.keys(userTimingsData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(userTimingsData.score) }}>20. {userTimingsData.title}</h3>
    <p>{userTimingsData.description}</p>
    <p>Score: {userTimingsData.score}</p>
    <p>Score Display Mode: {userTimingsData.scoreDisplayMode}</p>
    <p>Display Value: {userTimingsData.displayValue}</p>
    {userTimingsData.details && (
      <div>
        <h3>Details:</h3>
        {userTimingsData.details.items && (
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
              {userTimingsData.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.timingType}</td>
                  <td>{item.startTime} ms</td>
                  <td>{item.duration} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(serverResponseTimeData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(serverResponseTimeData.score) }}>21. {serverResponseTimeData.title}</h3>
    <p>{serverResponseTimeData.description}</p>
    <p>Score: {serverResponseTimeData.score}</p>
    <p>Score Display Mode: {serverResponseTimeData.scoreDisplayMode}</p>
    <p>Display Value: {serverResponseTimeData.displayValue}</p>
    <p>Numeric Value: {serverResponseTimeData.numericValue} {serverResponseTimeData.numericUnit}</p>
    {serverResponseTimeData.details && (
      <div>
        <h3>Details:</h3>
        {serverResponseTimeData.details.items && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Time Spent (ms)</th>
              </tr>
            </thead>
            <tbody>
              {serverResponseTimeData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                  <td>{item.responseTime} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(criticalRequestChainsData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(criticalRequestChainsData.score) }}>22. {criticalRequestChainsData.title}</h3>
    <p>{criticalRequestChainsData.description}</p>
    <p>Score: {criticalRequestChainsData.score}</p>
    <p>Score Display Mode: {criticalRequestChainsData.scoreDisplayMode}</p>
    <p>Display Value: {criticalRequestChainsData.displayValue}</p>
    {criticalRequestChainsData.details && (
      <div>
        <h3>Details:</h3>
        <p>Chains Found: {Object.keys(criticalRequestChainsData.details.chains).length}</p>
        <table>
          <thead>
            <tr>
              <th>Chain ID</th>
              <th>Duration (ms)</th>
              <th>Length</th>
              <th>Transfer Size</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(criticalRequestChainsData.details.chains).map(([chainId, chainData]) => (
              <tr key={chainId}>
                <td>{chainId}</td>
                <td>{chainData.children ? chainData.children.duration : '-'}</td>
                <td>{chainData.children ? chainData.children.length : '-'}</td>
                <td>{chainData.children ? chainData.children.transferSize : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {criticalRequestChainsData.details.longestChain && (
          <p>
            Longest Chain: Duration {criticalRequestChainsData.details.longestChain.duration} ms,
            Length {criticalRequestChainsData.details.longestChain.length},
            Transfer Size {criticalRequestChainsData.details.longestChain.transferSize}
          </p>
        )}
      </div>
    )}
    <hr />
  </div>
)}

{Object.keys(networkRequestsData).length > 0 && (
  <div className="result-section">
    <h3 style={{ color: getScoreColor(networkRequestsData.score) }}>23. {networkRequestsData.title}</h3>
    <p>{networkRequestsData.description}</p>
    <p>Score: {networkRequestsData.score}</p>
    <p>Score Display Mode: {networkRequestsData.scoreDisplayMode}</p>
    {networkRequestsData.details && (
      <div>
        <h3>Details:</h3>
        {networkRequestsData.details.items && (
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
              {networkRequestsData.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                  <td>{item.resourceType}</td>
                  <td>{item.resourceSize}</td>
                  <td>{item.networkRequestTime}</td>
                  <td>{item.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
    <hr />
  </div>
)}




        {Object.keys(lighthouseMetrics).length > 0 && (
          <div className="result-section">
            <h2>Lighthouse Results</h2>
            {renderTable(lighthouseMetrics)}
            {/*{renderBarChart(lighthouseMetrics, 'Lighthouse Metrics')}*/}
          </div>
        )}

        {Object.keys(thumbnailData).length > 0 && (
          <div className="result-section">
         
            <ul style={{display:'flex', listStyle:'none', width:'100%'}}>
              {thumbnailData.items.map((item, index) => (
                <li key={index}>
                <img src={item.data} alt="Full Page Screenshot" />
                </li>
              ))}
            </ul>
          </div>
          )}

        {screenshot && (
          <div className="result-section">
            <h2>Screenshot</h2>
            <img src={screenshot} alt="Full Page Screenshot" />
          </div>
        )}
      </div>

      {carbonFootprint !== null && (
        <div className="result-section">
          <h2>Carbon Footprint</h2>
          <p>
            Estimated Carbon Footprint: {carbonFootprint} kg CO2e
          </p>
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
