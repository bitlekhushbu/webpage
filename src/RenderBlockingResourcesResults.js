// RenderBlockingResourcesResults.js
import React from 'react';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

const RenderBlockingResourcesResults = ({ data }) => {
    return (
        <ul>
          {data.items && data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Wasted Milliseconds: {item.wastedMs} ms</p>
            </li>
          ))}
        </ul>
      );
    };

export default RenderBlockingResourcesResults;