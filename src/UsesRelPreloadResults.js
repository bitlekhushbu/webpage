// UsesRelPreloadResults.js
import React from 'react';


const UsesRelPreloadResults = ({ data }) => {

return (
      
    <table>
    <thead>
      <tr>
        <th>URL</th>
        <th>Total Blocking Time</th>
      </tr>
    </thead>
    <tbody>
    { data.items && data.items.map((item, index) => (
        <tr key={index}>
          <td>{item.url}</td>
          <td>{item.totalBlockingTime.toFixed(2)} ms</td>
        </tr>
      ))}
    </tbody>
  </table>
   
);
};

export default  UsesRelPreloadResults;