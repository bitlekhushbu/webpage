// TotalByteWeightResults.js
import React from 'react';


const TotalByteWeightResults = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Transfer Size</th>
              </tr>
            </thead>
            <tbody>
            {data.details && data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.totalBytes} bytes</td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default TotalByteWeightResults;