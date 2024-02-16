// UnusedJavascriptResults.js
import React from 'react';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };


const UnusedJavascriptResults = ({ data }) => {
  return (
    <ul>
      {data.items && data.items.map((item, index) => (
        <li key={index}>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
          <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
        </li>
      ))}
    </ul>
  );
};

export default UnusedJavascriptResults;
