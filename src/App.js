import React from 'react';
import PageSpeedInsights from './PageSpeedInsights';


import Header from './Header';
import { SpeedInsights } from "@vercel/speed-insights/react";
const App = () => {
  
  return(
    <>
    <Header/>
    <PageSpeedInsights/>
    <SpeedInsights/>
    </>
  );
}

export default App;

