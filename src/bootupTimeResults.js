// bootupTimeResults.js
import React from 'react';


const bootupTimeResults = ({ data }) => {
    return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Total CPU Time</th>
              <th>Script Evaluation</th>
              <th>Script Parse</th>
            </tr>
          </thead>
          <tbody>
            {data.details && data.details.items.map((item, index) => (
              <tr key={index}>
                <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                <td>{item.total.toFixed(0)} ms</td>
                <td>{item.scripting.toFixed(0)} ms</td>
                <td>{item.scriptParseCompile.toFixed(0)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
     
      );
  
};

export default  bootupTimeResults;