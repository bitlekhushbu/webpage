import React, { useState } from 'react';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';
import IconButton from '@mui/material/IconButton';   
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, Divider, LinearProgress, CircularProgress, Box, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import {  Tabs, Tab, MenuItem, Button, Grid, Card, CardContent, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnminifiedCssResults from './UnminifiedCssResults';
import UnminifiedJavascriptResults from './UnminifiedJavascriptResults';
import UnusedCssResults from './UnusedCssResults';
import UnusedJavascriptResults from './UnusedJavascriptResults';
import UnsizedImagesResults from './UnsizedImagesResults';
import ThirdPartySummaryResults from './ThirdPartySummaryResults';
import OffscreenImagesResults from './OffscreenImagesResults';
import NetworkRequestsResults from './NetworkRequestsResults';
import UsesResponsiveImagesResults from './UsesResponsiveImagesResults';
import RenderBlockingResourcesResults from './RenderBlockingResourcesResults';
import MainThreadWorkBreakdownResults from './MainThreadWorkBreakdownResults';
import DomSizeResults from './DomSizeResults';
import ModernImageFormatsResults from './ModernImageFormatsResults';
import LongCacheTTLResults from './LongCacheTTLResults';
import FontDisplayResults from './FontDisplayResults';
import UsesPassiveEventListenersResults from './UsesPassiveEventListenersResults';
import UsesOptimizedImagesResults from './UsesOptimizedImagesResults';
import TotalByteWeightResults from './TotalByteWeightResults';
import LongTasksResults from './LongTasksResults';
import LayoutShiftElementsResults from './LayoutShiftElementsResults';
import CriticalRequestChainsResults from './CriticalRequestChainsResults';
import UserTimingsData from './UserTimingsData';
import ServerResponseTimeData from './ServerResponseTimeData';
import AvoidRedirectsResults from './AvoidRedirectsResults';
//import UsesRelPreloadResults from './UsesRelPreloadResults';
import EfficientAnimatedContentResults from './EfficientAnimatedContentResults';
import DuplicatedJavascriptResults from './DuplicatedJavascriptResults';
import ThirdPartyFacadesResults from './ThirdPartyFacadesResults';
import LargestContentPaintResults from './LargestContentPaintResults';
import PreloadLCPImageResults from './PreloadLCPImageResults';
import LegacyJavascriptResults from './LegacyJavascriptResults';
import bootupTimeResults from './bootupTimeResults';
import NonCompositedAnimationsResults from './NonCompositedAnimationsResults';
import UsesTextCompressionResults from './UsesTextCompressionResults';
import UsesRelPreconnectResults from './UsesRelPreconnectResults';
import NoDocumentWriteResults from './NoDocumentWriteResults';
import NetworkRequestsPieChart from './NetworkRequestsPieChart';
import TotalByteWeightPieChart from './TotalByteWeightPieChart';




Chart.register(CategoryScale);




const PageSpeedInsights = () => {
  const [selectedLayoutClass, setSelectedLayoutClass] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  const [totalByteWeight, setTotalByteWeight] = useState(0);
  const [screenshot, setScreenshot] = useState('');
  const [thumbnailData, setthumbnailData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile'); // Added state for device selection
  const [unsizedImagesData, setUnsizedImagesData] = useState({});
  const [unusedCssData, setUnusedCssData] = useState({});// Add state for unused-css
  const [unminifiedJavascriptData, setUnminifiedJavascriptData] = useState({}); // Add state for unminified-javascript
  const [unusedJavascriptData, setUnusedJavascriptData] = useState({}); // Add state for unused-javascript
  const [unminifiedCssData, setUnminifiedCSSData] = useState({}); // Add state for unminified-javascript
  const [thirdPartySummaryData, setThirdPartySummaryData] = useState({});
  const [usesResponsiveImagesData, setUsesResponsiveImagesData] = useState({});
  const [offscreenImagesData, setOffscreenImagesData] = useState({});
  const [renderBlockingResourcesData, setRenderBlockingResourcesData] = useState({});
  const [mainThreadWorkBreakdownData, setMainThreadWorkBreakdownData] = useState({});
  const [domSizeData, setDomSizeData] = useState({});
  const [modernImageFormatsData, setModernImageFormatsData] = useState({});
  const [longCacheTTLData, setLongCacheTTLData] = useState({});
  const [fontDisplayData, setFontDisplayData] = useState({});
  const [usesPassiveEventListenersData, setUsesPassiveEventListenersData] = useState({});
  const [usesOptimizedImagesData, setUsesOptimizedImagesData] = useState({});
  const [totalByteWeightData, setTotalByteWeightData] = useState({});  
  const [longTasksData, setLongTasksData] = useState({});
  const [layoutShiftElementsData, setLayoutShiftElementsData] = useState({});
  const [userTimingsData, setUserTimingsData] = useState({});
  const [serverResponseTimeData, setServerResponseTimeData] = useState({});
  const [criticalRequestChainsData, setCriticalRequestChainsData] = useState({});
  const [avoidRedirectsData, setAvoidRedirectsData] = useState({});
  //const [usesRelPreloadData, setUsesRelPreloadData] = useState({});
  const [efficientAnimatedContentData, setEfficientAnimatedContentData] = useState({});
  const [duplicatedJavascriptData, setDuplicatedJavascriptData] = useState({});
  const [thirdPartyFacadesData, setThirdPartyFacadesData] = useState({});
  const [largestContentPaintData, setLargestContentPaintData] = useState({});
  const [preloadLCPImageData, setPreloadLCPImageData] = useState({});
  const [legacyJavascriptData, setLegacyJavascriptData] = useState({});  
  const [bootupTimeData, setBootupTimeData] = useState({});    
  const [nonCompositedAnimationsData, setNonCompositedAnimationsData] = useState({});  
  const [usesTextCompressionData, setUsesTextCompressionData] = useState({});    
  const [usesRelPreconnectData, setUsesRelPreconnectData] = useState({});
  const [noDocumentWriteData, setNoDocumentWriteData] = useState({});
  const [networkRequestsData, setNetworkRequestsData] = useState({});
  const [selectedTab, setSelectedTab] = useState("All");
   




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
    { Component: UnminifiedCssResults, data: unminifiedCssData, title: "Unminified CSS", tags: ["FCP", "LCP"] },
    { Component: UnminifiedJavascriptResults, data: unminifiedJavascriptData, title: "Unminified JavaScript", tags: ["FCP", "LCP"] },
   { Component: UnsizedImagesResults, data: unsizedImagesData, title: "Image elements do not have explicit `width` and `height`", tags: ["CLS"]  },
   { Component: UnusedCssResults, data: unusedCssData, title: "Reduce Unused CSS", tags: ["FCP", "LCP"] },
   { Component: UnusedJavascriptResults, data: unusedJavascriptData, title: "Reduce Unused JavaScript", tags: ["LCP"]  },
   { Component: ThirdPartySummaryResults, data: thirdPartySummaryData, title: "Reduce the impact of third-party code", tags: ["TBT"]  },
   { Component: OffscreenImagesResults, data: offscreenImagesData, title: "Defer offscreen images", tags: []  },
    { Component: UsesResponsiveImagesResults, data: usesResponsiveImagesData, title: "Properly size images", tags: []  },
    { Component: RenderBlockingResourcesResults, data: renderBlockingResourcesData, title: "Eliminate render-blocking resources", tags: ["FCP", "LCP"]  },
    { Component: MainThreadWorkBreakdownResults, data: mainThreadWorkBreakdownData, title: "Minimize main-thread work", tags: ["TBT"]  },
    { Component: DomSizeResults, data: domSizeData, title: "Avoid an excessive DOM size", tags: ["TBT"]  },
    { Component: ModernImageFormatsResults, data: modernImageFormatsData, title: "Serve images in next-gen formats", tags: []  },
    { Component: LongCacheTTLResults, data: longCacheTTLData, title: "Serve static assets with an efficient cache policy", tags: []  },
    { Component: FontDisplayResults, data: fontDisplayData, title: "Ensure text remains visible during webfont load", tags: ["FCP", "LCP"]  },
    { Component: UsesPassiveEventListenersResults, data: usesPassiveEventListenersData, title: "Does not use passive listeners to improve scrolling performance", tags: []  },
    { Component: UsesOptimizedImagesResults, data: usesOptimizedImagesData, title: "Efficiently encode images", tags: []  },
    { Component: TotalByteWeightResults, data: totalByteWeightData, title: "Avoid enormous network payloads", tags: ["LCP"]  },
    { Component: LongTasksResults, data: longTasksData, title: "Avoid long main-thread tasks", tags: ["TBT"]  },
    { Component: LayoutShiftElementsResults, data: layoutShiftElementsData, title: "Avoid large layout shifts" , tags: ["CLS"] },
    { Component: UserTimingsData, data: userTimingsData, title: "User Timing marks and measures", tags: []  },
    { Component: ServerResponseTimeData, data: serverResponseTimeData, title: "Server Response Time", tags: ["FCP", "LCP"]  },
    { Component: CriticalRequestChainsResults,data: criticalRequestChainsData, title: "Avoid chaining critical requests", tags: ["FCP", "LCP"] },
    { Component: AvoidRedirectsResults, data: avoidRedirectsData, title: "Avoid multiple page redirects", tags: ["FCP", "LCP"] },
    //{ Component: UsesRelPreloadResults, data: usesRelPreloadData, title: "Preload key requests", tags: ["FCP", "LCP"]  },
    { Component: EfficientAnimatedContentResults, data: efficientAnimatedContentData, title: "Use video formats for animated content", tags: ["LCP"]  },
    { Component: DuplicatedJavascriptResults, data: duplicatedJavascriptData, title: "Remove duplicate modules in JavaScript bundles", tags: ["TBT"]  },
    { Component: ThirdPartyFacadesResults, data: thirdPartyFacadesData, title: "Lazy load third-party resources with facades", tags: ["TBT"]  },
    { Component: LargestContentPaintResults, data: largestContentPaintData, title: "Largest Contentful Paint image was lazily loaded", tags: ["LCP"]  },
    { Component: PreloadLCPImageResults, data: preloadLCPImageData, title: "Preload Largest Contentful Paint image", tags: ["LCP"]  },
    { Component: LegacyJavascriptResults, data: legacyJavascriptData, title: "Avoid serving legacy JavaScript to modern browsers", tags: ["TBT"]  },
    { Component: bootupTimeResults, data: bootupTimeData, title: "Reduce JavaScript execution time", tags: ["TBT"]  } ,
    { Component: NonCompositedAnimationsResults, data: nonCompositedAnimationsData, title: "Avoid non-composited animations", tags: ["CLS"]  },
    { Component: UsesTextCompressionResults, data: usesTextCompressionData, title: "Enable text compression", tags: ["FCP", "LCP"]  },
    { Component: UsesRelPreconnectResults, data: usesRelPreconnectData, title: "Preconnect to required origins", tags: []  },
    // { data: viewportData, title: "Does not have a `\u003cmeta name=\"viewport\"\u003e` tag with `width` or `initial-scale`" }
    { Component: NoDocumentWriteResults, data: noDocumentWriteData, title: "Avoids `document.write()`", tags: []  },
    { Component: NetworkRequestsResults, data: networkRequestsData, title: "Network Requests", tags: ["TBT"]  },
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
    case "Unminified JavaScript":
    case "Reduce Unused CSS":
    case "Reduce Unused JavaScript":
    case "Image elements do not have explicit `width` and `height`":
    case "Reduce the impact of third-party code":
    case "Defer offscreen images":
    case "Properly size images":
    case "Eliminate render-blocking resources":
    case "Minimize main-thread work":
    case "Avoid an excessive DOM size":
    case "Serve images in next-gen formats":
    case "Serve static assets with an efficient cache policy":
    case "Ensure text remains visible during webfont load":
    case "Does not use passive listeners to improve scrolling performance":
    case "Efficiently encode images":
    case "Avoid enormous network payloads":
    case "Avoid long main-thread tasks":
    case "Avoid large layout shifts":
    case "User Timing marks and measures":
    case "Server Response Time":
    case "Avoid multiple page redirects":
    case "Preload key requests":
    case "Use video formats for animated content":
    case "Remove duplicate modules in JavaScript bundles":
    case "Lazy load third-party resources with facades":
    case "Largest Contentful Paint image was lazily loaded":
    case "Preload Largest Contentful Paint image":
    case "Avoid serving legacy JavaScript to modern browsers":
    case "Reduce JavaScript execution time":
    case "Avoid non-composited animations":
    case "Enable text compression":
    case "Avoids `document.write()`":
    case  "Preconnect to required origins":
    case "Network Requests":
      return <resultSection.Component data={resultSection.data} />;




      // Add cases for other result sections




      default:
        return null; // Default case, no specific details to render
    }
  };








 




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
const thirdPartySummaryData = json.lighthouseResult.audits["third-party-summary"].details.items;




// Extract information from third-party-summary
const thirdPartySummary = {
  title: json.lighthouseResult.audits["third-party-summary"].title,
  description: json.lighthouseResult.audits["third-party-summary"].description,
  score: json.lighthouseResult.audits["third-party-summary"].score,
  displayValue: json.lighthouseResult.audits["third-party-summary"].displayValue,
  items: thirdPartySummaryData.flatMap(item => (
    item.subItems.items.map(subItem => ({
      url: subItem.url,
      transferSize: subItem.transferSize,
      mainThreadTime: subItem.blockingTime, // Correcting access to mainThreadTime
    }))
  )),
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
const layoutShiftElementsData = lighthouseData.audits["layout-shifts"];
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
























//Display information for "network-requests"



const networkRequestsData = lighthouseData.audits["network-requests"];
console.log(networkRequestsData);

const networkRequests = {
    title: networkRequestsData?.title || 'N/A',
    description: networkRequestsData?.description || 'N/A',
    score: networkRequestsData?.score || 0,
    scoreDisplayMode: networkRequestsData?.scoreDisplayMode || 'N/A',
    displayValue: networkRequestsData?.displayValue || 'N/A',
    details: networkRequestsData?.details || {}, // Default to an empty object if undefined
};

if (typeof setNetworkRequestsData === "function") {
    setNetworkRequestsData(networkRequests);
} else {
    console.error("setNetworkRequestsData is not a function");
}


// Display information for "Avoid multiple page redirects"
const avoidRedirectsData = lighthouseData.audits["redirects"];
console.log(avoidRedirectsData);




// Extract information from avoid-multiple-page-redirects
const avoidRedirects = {
  title: avoidRedirectsData.title,
  description: avoidRedirectsData.description,
  score: avoidRedirectsData.score,
  scoreDisplayMode: avoidRedirectsData.scoreDisplayMode,
  displayValue: avoidRedirectsData.displayValue,
  numericValue: avoidRedirectsData.numericValue,
  numericUnit: avoidRedirectsData.numericUnit,
  details: avoidRedirectsData.details,
};




setAvoidRedirectsData(avoidRedirects);








// Display information for "uses-rel-preload"
// const usesRelPreloadData = lighthouseData.audits["uses-rel-preload"];
// console.log(usesRelPreloadData);




// Extract information from uses-rel-preload
// const usesRelPreload = {
//   title: usesRelPreloadData.title,
//   description: usesRelPreloadData.description,
//   score: usesRelPreloadData.score,
//   scoreDisplayMode: usesRelPreloadData.scoreDisplayMode,
//   displayValue: usesRelPreloadData.displayValue,
//   numericValue: usesRelPreloadData.numericValue,
//   numericUnit: usesRelPreloadData.numericUnit,
//   details: usesRelPreloadData.details,
// };




// setUsesRelPreloadData(usesRelPreload);




// Display information for "efficient-animated-content"
const efficientAnimatedContentData = lighthouseData.audits["efficient-animated-content"];
console.log(efficientAnimatedContentData);




// Extract information from efficient-animated-content
const efficientAnimatedContent = {
  title: efficientAnimatedContentData.title,
  description: efficientAnimatedContentData.description,
  score: efficientAnimatedContentData.score,
  scoreDisplayMode: efficientAnimatedContentData.scoreDisplayMode,
  displayValue: efficientAnimatedContentData.displayValue,
  numericValue: efficientAnimatedContentData.numericValue,
  numericUnit: efficientAnimatedContentData.numericUnit,
  details: efficientAnimatedContentData.details,
};








setEfficientAnimatedContentData(efficientAnimatedContent);








// Display information for "duplicated-javascript"
const duplicatedJavascriptData = lighthouseData.audits["duplicated-javascript"];
console.log(duplicatedJavascriptData);




// Extract information from duplicated-javascript
const duplicatedJavascript = {
  title: duplicatedJavascriptData.title,
  description: duplicatedJavascriptData.description,
  score: duplicatedJavascriptData.score,
  scoreDisplayMode: duplicatedJavascriptData.scoreDisplayMode,
  displayValue: duplicatedJavascriptData.displayValue,
  numericValue: duplicatedJavascriptData.numericValue,
  numericUnit: duplicatedJavascriptData.numericUnit,
  details: duplicatedJavascriptData.details,
};




setDuplicatedJavascriptData(duplicatedJavascript);




// Display information for "third-party-facades"
const thirdPartyFacadesData = lighthouseData.audits["third-party-facades"];
console.log(thirdPartyFacadesData);




// Extract information from third-party-facades
const thirdPartyFacades = {
  title: thirdPartyFacadesData.title,
  description: thirdPartyFacadesData.description,
  score: thirdPartyFacadesData.score,
  scoreDisplayMode: thirdPartyFacadesData.scoreDisplayMode,
  displayValue: thirdPartyFacadesData.displayValue,
  numericValue: thirdPartyFacadesData.numericValue,
  numericUnit: thirdPartyFacadesData.numericUnit,
  details: thirdPartyFacadesData.details,
};








setThirdPartyFacadesData(thirdPartyFacades);








const lcpLazyLoadedItems = lighthouseData.audits["lcp-lazy-loaded"].details.items;
console.log("Largest Contentful Data",lcpLazyLoadedItems);








const largestContentPaintData = {
  title: lighthouseData.audits["lcp-lazy-loaded"].title,
  description: lighthouseData.audits["lcp-lazy-loaded"].description,
  score: lighthouseData.audits["lcp-lazy-loaded"].score,
  displayValue: lighthouseData.audits["lcp-lazy-loaded"].displayValue,
  items: lcpLazyLoadedItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};








setLargestContentPaintData(largestContentPaintData);








//Preload Largest Contentful Paint image
const prioritizeLCPImageItems = lighthouseData.audits["prioritize-lcp-image"].details.items;
console.log("Largest Contentful Data",prioritizeLCPImageItems);








const preloadLCPImageData = {
  title: lighthouseData.audits["prioritize-lcp-image"].title,
  description: lighthouseData.audits["prioritize-lcp-image"].description,
  score: lighthouseData.audits["prioritize-lcp-image"].score,
  displayValue: lighthouseData.audits["prioritize-lcp-image"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};








setPreloadLCPImageData(preloadLCPImageData);








// Display information for "legacy-javascript"
const legacyJavascriptData = lighthouseData.audits["legacy-javascript"];
console.log(legacyJavascriptData);








// Extract information from legacy-javascript
const legacyJavascript = {
  title: legacyJavascriptData.title,
  description: legacyJavascriptData.description,
  score: legacyJavascriptData.score,
  scoreDisplayMode: legacyJavascriptData.scoreDisplayMode,
  displayValue: legacyJavascriptData.displayValue,
  numericValue: legacyJavascriptData.numericValue,
  numericUnit: legacyJavascriptData.numericUnit,
  details: legacyJavascriptData.details,
};








setLegacyJavascriptData(legacyJavascript);  
















// Display information for "bootup-time"




const bootupTimeData = lighthouseData.audits["bootup-time"];
console.log(legacyJavascriptData);








// Extract information from bootup-time
const bootupTime = {
  title: bootupTimeData.title,
  description: bootupTimeData.description,
  score: bootupTimeData.score,
  scoreDisplayMode: bootupTimeData.scoreDisplayMode,
  displayValue: bootupTimeData.displayValue,
  numericValue: bootupTimeData.numericValue,
  numericUnit: bootupTimeData.numericUnit,
  details: bootupTimeData.details,
};








setBootupTimeData(bootupTime);  








//Avoid non-composited animations
const NonCompositedAnimations = lighthouseData.audits["non-composited-animations"].details.items;
console.log("Largest Contentful Data",NonCompositedAnimations);








const NonCompositedAnimationsData = {
  title: lighthouseData.audits["non-composited-animations"].title,
  description: lighthouseData.audits["non-composited-animations"].description,
  score: lighthouseData.audits["non-composited-animations"].score,
  displayValue: lighthouseData.audits["non-composited-animations"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};
setNonCompositedAnimationsData(NonCompositedAnimationsData);  
























//Enable text compression usesTextCompression
const usesTextCompression = lighthouseData.audits["uses-text-compression"].details.items;
console.log("Largest Contentful Data",usesTextCompression);








const usesTextCompressionData = {
  title: lighthouseData.audits["uses-text-compression"].title,
  description: lighthouseData.audits["uses-text-compression"].description,
  score: lighthouseData.audits["uses-text-compression"].score,
  displayValue: lighthouseData.audits["uses-text-compression"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};
setUsesTextCompressionData(usesTextCompressionData);  




















//Avoids `document.write()`
const noDocumentWrite = lighthouseData.audits["no-document-write"].details.items;
console.log("Largest Contentful Data",noDocumentWrite);








const noDocumentWriteData = {
  title: lighthouseData.audits["no-document-write"].title,
  description: lighthouseData.audits["no-document-write"].description,  
  score: lighthouseData.audits["no-document-write"].score,
  displayValue: lighthouseData.audits["no-document-write"].displayValue
 
};
setNoDocumentWriteData(noDocumentWriteData);








// Display information for "uses-rel-preconnect"
const usesRelPreconnectData = lighthouseData.audits["uses-rel-preconnect"];
console.log(usesRelPreconnectData);




// Extract information from uses-rel-preconnect
const usesRelPreconnect = {
  title: usesRelPreconnectData.title,
  description: usesRelPreconnectData.description,
  score: usesRelPreconnectData.score,
  scoreDisplayMode: usesRelPreconnectData.scoreDisplayMode,
  warnings: usesRelPreconnectData.warnings,
  details: usesRelPreconnectData.details,
};








setUsesRelPreconnectData(usesRelPreconnect);








const networkRequestsItems = networkRequestsData.details && networkRequestsData.details.items;
const totalUrls = networkRequestsItems ? networkRequestsItems.length : 0;








let totalByteWeightKiB = parseFloat(lighthouseData.audits['total-byte-weight'].displayValue.replace(/[^\d.]/g, ''));
let totalByteWeightMB = totalByteWeightKiB / 1024;
let newTotalByteWeightMB = totalByteWeightMB.toFixed(2);
let newTotalByteWeightMBText = `${newTotalByteWeightMB} MB`;




      const lighthouseMetricsData = {
        'Performance': lighthouseData.categories.performance.score * 100,
        'Total Blocking Time': lighthouseData.audits['total-blocking-time'].numericValue / 1000,
        'First Contentful Paint': lighthouseData.audits['first-contentful-paint'].displayValue,
        'Largest Contentful Paint': lighthouseData.audits['largest-contentful-paint'].displayValue,
        'Speed Index': lighthouseData.audits['speed-index'].displayValue,
        'Cumulative Layout Shift': lighthouseData.audits['cumulative-layout-shift'].displayValue,
        'First Input Delay': lighthouseData.audits['max-potential-fid'].numericValue  / 1000,
        'Total Byte Weight': newTotalByteWeightMBText,
        'Network Requests': totalUrls,
      };
     




       
      setLighthouseMetrics(lighthouseMetricsData);
      showFullPageScreenshot(lighthouseData.audits['final-screenshot']);
       
     
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
 




  const showFullPageScreenshot = (screenshotData) => {
    setScreenshot(screenshotData.details.data);
  };




  const renderTable = (metrics) => {
    const fcpValue = metrics['First Contentful Paint'];
    const lcpValue = metrics['Largest Contentful Paint'];
    const speedIndexValue = metrics['Speed Index'];
    const clsValue = metrics['Cumulative Layout Shift'];
    const tbtValue = metrics['Total Blocking Time'];
    const fidValue = metrics['First Input Delay'];
   
    const fcpCategory = categorizeFCP(parseFloat(fcpValue));
    const lcpCategory = categorizeLCP(parseFloat(lcpValue));
    const speedIndexCategory = categorizeSpeedIndex(parseFloat(speedIndexValue));
    const clsCategory = categorizeCLS(parseFloat(clsValue));
    const tbtCategory = categorizeTBT(parseFloat(tbtValue));
    const fidCategory = categorizeFID(parseFloat(fidValue));




    console.log('Latest value one', fcpValue);
 
    return (
      <Grid container spacing={3}>
        {Object.keys(metrics).map((key, index) => {
          const tooltipContent = getTooltipContent(key);
          const colorCategory =
            key === 'Total Blocking Time'
              ? tbtCategory
              : key === 'First Input Delay'
              ? fidCategory
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
            key === 'First Input Delay'
              ?
              <span>
                <span>
                  {metrics[key].toFixed(2)} s
                </span>
                <span style={{ marginLeft: '4px', color: getColorBasedOnCategory(colorCategory) }}>
                  ({colorCategory})
                </span>
             </span>
              : key === 'Total Blocking Time'
              ?
              <span>
                 {metrics[key].toFixed(2)} s
                  <span style={{ marginLeft: '4px', color: getColorBasedOnCategory(colorCategory) }}>
                    ({colorCategory})
                  </span>
               </span>
              : key === 'First Contentful Paint' ||
                key === 'Largest Contentful Paint' ||
                key === 'Speed Index' ||
                key === 'Cumulative Layout Shift'
              ?
              <span>
              {metrics[key]}
              <span style={{ marginLeft: '4px', color: getColorBasedOnCategory(colorCategory) }}>
                ({colorCategory})
              </span>
            </span>
              : metrics[key];




          return (
            <Grid item xs={3} key={index}>
           
            <Card variant="outlined" onClick={() => handleCardClick(key)}>
              <CardContent style={{ borderLeft: `0.25rem solid ${getColorBasedOnCategory(colorCategory)}` }} >
             
                    <h4 className="metric_card_title">
                      {key}
                      {tooltipContent && (
                      <Tooltip title={tooltipContent} arrow>
                        <IconButton size="small" color="primary" style={{ marginLeft: 4 }}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      )}
                    </h4>
                 
                  <h3 className="metric_card_value">
                    {key === 'Total Blocking Time' ||
                    key === 'First Input Delay' ||
                    key === 'First Contentful Paint' ||
                    key === 'Largest Contentful Paint' ||
                    key === 'Speed Index' ||
                    key === 'Cumulative Layout Shift' ||
                    key === 'Total Byte Weight' ||
                    key === 'Network Requests'? (
                      <span>
                        {displayValue}
                      </span>
                    ) : (
                      displayValue
                    )}
                  </h3>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };
 
 
  const getTooltipContent = (key) => {
    // Customize tooltip content based on the metric key
    switch (key) {
      case 'Total Blocking Time':
        return (
          <div>
            <div>Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms.</div>
          </div>
        );
      case 'First Contentful Paint':
        return 'First Contentful Paint marks the time at which the first text or image is painted.';
      case 'Largest Contentful Paint':
        return 'Largest Contentful Paint marks the time at which the largest text or image is painted.';
      case 'Cumulative Layout Shift':
        return 'Cumulative Layout Shift measures the movement of visible elements within the viewport.';
      // ... add more cases as needed




      default:
        return '';
    }
  };




// Function to categorize FCP, LCP, Speed Index, and CLS values
const categorizeTBT = (tbtValue) => {
  if (tbtValue <= 0.2) {
    return 'Good';
  } else if (tbtValue > 0.2 && tbtValue <= 0.6) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};




const categorizeFID = (fidValue) => {
  if (fidValue <= 0.1) {
    return 'Good';
  } else if (fidValue > 0.1 && fidValue <= 0.3) {
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
      return '#00C853';
    case 'Needs Improvement':
      return '#FFA500';
    case 'Poor':
      return '#FF0000';
    default:
      return '';
  }
};
const sortNetworkRequests = (items) => {
  return items.slice().sort((a, b) => {
    if (a.priority === "Low" && b.priority !== "Low") {
      return -1; // Low priority comes first
    } else if (a.priority !== "Low" && b.priority === "Low") {
      return 1; // Non-Low priority comes first
    } else if (a.priority === "Low" && b.priority === "Low") {
      // If both are Low priority, sort by resource size in descending order
      return b.resourceSize - a.resourceSize;
    } else {
      // If priorities are the same, sort by resource size in descending order
      return b.resourceSize - a.resourceSize;
    }
  });
};














  const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };




  const filteredResultSections = selectedTab === "All"
    ? resultSections
    : resultSections.filter(section => section.tags.some(tag => tag === selectedTab));




  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 
  const handleCardClick = (key) => {
    if (key === 'Total Blocking Time') {
        setSelectedTab('TBT');
        const tbtTab = document.getElementById('TBT-tab');
        tbtTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (key === 'First Contentful Paint') {
        setSelectedTab('FCP');
        const tbtTab = document.getElementById('FCP-tab');
        tbtTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (key === 'Largest Contentful Paint') {
        setSelectedTab('LCP');
        const tbtTab = document.getElementById('LCP-tab');
        tbtTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (key === 'Cumulative Layout Shift') {
        setSelectedTab('CLS');
        const tbtTab = document.getElementById('CLS-tab');
        tbtTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
       <div className='grid_container_main'>
      { lighthouseMetrics['Performance'] !== undefined && (
        <div className="result-section">
          <h2>Overall score</h2>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={lighthouseMetrics['Performance']}
              size={200}
              style={{
                borderRadius: '50%',
                background: lighthouseMetrics['Performance'] >= 60 ? '#B9F6CA' : lighthouseMetrics['Performance'] >= 41 ? '#FBE9E7' : '#EF9A9A',
                color: lighthouseMetrics['Performance'] >= 60 ? '#00C853' : lighthouseMetrics['Performance'] >= 41 ? '#FFA500' : '#FF0000',
              }}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <h2 style={{ fontSize: '42px', margin: '0px' }}>
                {`${lighthouseMetrics['Performance'].toFixed(0)}`}
              </h2>
            </Box>
          </Box>
          {/* Add conditional sentences based on the performance score and selected device */}
          <p> {getPerformanceSentence(selectedDevice, lighthouseMetrics['Performance'])}</p>
        </div>
      )}




      {screenshot && (
        <div className="result-section final-screenshot-load">
          <img src={screenshot} alt="Full Page Screenshot" />
        </div>
      )}
      </div>
      <Divider />




        {Object.keys(lighthouseMetrics).length > 0 && (
          <div className="result-section matrics-overview-section">
            <h2>Metrics Overview</h2>
            {renderTable(filterOutPerformanceMetric(lighthouseMetrics))}
            <br/>
            <br/>
          </div>
        )}
      <Divider />
 
      <div className='result-section custom-pie-chart-section'>




      {Object.keys(totalByteWeightData).length > 0 && (
        <div className="custom-pie-chart-item">
        <h2>Resource Size</h2>
          <div className='totalByteWeight_pie-chart'>
            <TotalByteWeightPieChart networkRequestsData={networkRequestsData} />
          </div>
        </div>
      )}




     




      {Object.keys(networkRequestsData).length > 0 && (
        <div className="custom-pie-chart-item">
        <h2>Resource Count</h2>
          <div className='networkRequest_pie-chart'>
            <NetworkRequestsPieChart networkRequestsData={networkRequestsData} />
          </div>
        </div>
      )}
      </div> 

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




        {Object.keys(thumbnailData).length > 0 && (
          <div className="result-section">
            <h2>Page Load Visualization</h2>
            <ul style={{display:'flex', listStyle:'none', width:'100%', gap:'15px', paddingLeft:'0px'}}>
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




          <Divider />


          {sortedResultSections && (
  <div>
    <h2>Opportunities</h2>


    {/* Add tabs for each category */}
    <Tabs value={selectedTab} onChange={handleTabChange}>
      <Tab label="All" value="All" id="All-tab" />
      <Tab label="TBT" value="TBT" id="TBT-tab" />
      <Tab label="FCP" value="FCP" id="FCP-tab" />
      <Tab label="CLS" value="CLS" id="CLS-tab" />
      <Tab label="LCP" value="LCP" id="LCP-tab" />
    </Tabs>


    {filteredResultSections
      .filter(resultSection => {
        const scoreColor = getScoreColor(resultSection.data.score);
        return scoreColor !== 'green' && scoreColor !== 'gray';
      })
      .map((resultSection, index) => (
        resultSection.title !== 'Network Requests' && (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Typography style={{ color: getScoreColor(resultSection.data.score) }}>
                {`${index + 1}. ${resultSection.title}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <p className='main_description'>{resultSection.data.description}</p>
                {/* Render common details for the result section */}
                {renderResultDetails(resultSection)}
                {/* ... render other details for the result section */}
              </div>
            </AccordionDetails>
          </Accordion>
        )
      ))}
    <br />
    <br />
  </div>
)}




       
        <Divider />




        {Object.keys(networkRequestsData).length > 0 && (
          <div className="result-section">
            <h2>{networkRequestsData.title}</h2>
            <p>{networkRequestsData.description}</p>
            {networkRequestsData.details && (
              <div>
                {networkRequestsData.details.items && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>URL</TableCell>
                          <TableCell>Resource Type</TableCell>
                          <TableCell>Resource Size</TableCell>
                          <TableCell>Network Request Time</TableCell>
                          <TableCell>Priority</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortNetworkRequests(networkRequestsData.details.items).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Link href={item.url} target="_blank" rel="noreferrer">
                                {item.url}
                              </Link>
                            </TableCell>
                            <TableCell>{item.resourceType}</TableCell>
                            <TableCell>{item.resourceSize}</TableCell>
                            <TableCell>{item.networkRequestTime}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            )}
            <br/>
            <br/>
          </div>
        )}
        <Divider />
       
     




        {/* {screenshot && (
          <div className="result-section">
            <h2>Screenshot</h2>
            <img src={screenshot} alt="Full Page Screenshot" />
          </div>
        )} */}




     
      </div>
        )
      )
     }
    </div>
   
  );
};




function filterOutPerformanceMetric(metrics) {
  // Filter out the 'Performance' metric
  const filteredMetrics = Object.fromEntries(
    Object.entries(metrics).filter(([key]) => key !== 'Performance')
  );
  return filteredMetrics;
}




function getPerformanceSentence(device, score) {
  if (device === 'mobile') {
    if (score >= 0 && score <= 25) {
      return <p>Very poor as compared to many Shopify stores.</p>;
    } else if (score >= 26 && score <= 40) {
      return <p>Slower than many Shopify stores.</p>;
    } else if (score >= 41 && score <= 59) {
      return <p>Similar speed as many Shopify stores.</p>;
    } else if (score >= 60) {
      return <p>Faster than many Shopify stores.</p>;
    }
  } else if (device === 'desktop') {
    if (score >= 0 && score <= 65) {
      return <p>Slower than many Shopify stores.</p>;
    } else if (score >= 66 && score <= 89) {
      return <p>Similar speed as many Shopify stores.</p>;
    } else if (score >= 90) {
      return <p>Faster than many Shopify stores.</p>;
    }
  }




  // Default return if device is neither mobile nor desktop
  return null;
}








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
 



