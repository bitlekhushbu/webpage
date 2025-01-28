import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabaseClient';
import './PageSpeedInsights.css';

const ReportPage = () => {
  const { uniqueId } = useParams(); // Extract uniqueId from URL
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data, error } = await supabase
          .from('page_speed_data')
          .select('*')
          .eq('unique_url', `/report/${uniqueId}`)
          .single(); // Fetch a single record

        if (error) {
          console.error('Error fetching report:', error);
          setError('Report not found');
        } else {
          setReportData(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    };

    fetchReport();
  }, [uniqueId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!reportData) {
    return <h1>Loading...</h1>;
  }

 

return (
    <div className="result-section carbon_footprint url-data-carbon_footprint">
      <h2>Carbon Footprint</h2>
      <div className="main_item">
          <p>Report for:</p>
          <h3>{reportData.url}</h3>
        </div>
      <div className="main_content">
      
        <div className="main_item">
          <p>Page Weight</p>
          <h3>{reportData.page_weight}</h3>
        </div>
        <div className="main_item">
          <p>CO2e per Visit</p>
          <h3>{reportData.co2e_per_visit}</h3>
        </div>
      </div>
    </div>
  );
    


    
    
  
};

export default ReportPage;
