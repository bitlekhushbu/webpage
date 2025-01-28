import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageSpeedInsights from './PageSpeedInsights';
import ReportPage from './ReportPage';
import Header from './Header';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
  <Route path="/" element={<PageSpeedInsights />} />
  <Route path="/report/:uniqueId" element={<ReportPage />} />
</Routes>
    </Router>
  );
};

export default App;

