// UsesOptimizedImagesResults.js
import React from 'react';


const UsesOptimizedImagesResults = ({ data }) => {
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
         {data.details && data.details.items.map((item, index) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
              <td>{item.totalBytes} bytes</td>
              <td>{item.wastedBytes} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );
    };

export default UsesOptimizedImagesResults;