import React from 'react';
import PageSpeedInsights from './PageSpeedInsights';
import { SpeedInsights } from "@vercel/speed-insights/react"
const App = () => {
  return(
    <>
    <PageSpeedInsights/>
    <SpeedInsights/>
    </>
  );
}

export default App;

