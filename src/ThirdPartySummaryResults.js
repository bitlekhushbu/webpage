// ThirdPartySummaryResults.js
import React from 'react';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };
  

const ThirdPartySummaryResults = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Third Party:</th>
          <th>Transfer Size:</th>
          <th>Main Thread Time: </th>
        </tr>
      </thead>
      <tbody>
        {data.items && data.items.map((item, index) => (
          <tr key={index}>
            <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
            <td>{bytesToKiB(item.transferSize)} KiB</td>
            <td>{item.mainThreadTime} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ThirdPartySummaryResults;
