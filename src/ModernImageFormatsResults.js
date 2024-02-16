// ModernImageFormatsResults.js
import React from 'react';


const ModernImageFormatsResults = ({ data }) => {
    return (
        <ul>
          {data.items && data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {item.totalBytes} bytes</p>
              <p>Potential Savings: {item.wastedBytes} bytes</p>
              {/* Add additional information from item.node if needed */}
            </li>
          ))}
        </ul>
      );
    };

export default ModernImageFormatsResults;