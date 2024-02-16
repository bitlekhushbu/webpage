// DomSizeResults.js
import React from 'react';


const DomSizeResults = ({ data }) => {
    return (
        <ul>
          {data.details && data.details.map((item, index) => (
            <li key={index}>
              <p>Statistic: {item.statistic}</p>
              <p>Node: {item.node ? item.node.selector : 'N/A'}</p>
              <p>Value: {item.value}</p>
            </li>
          ))}
        </ul>
      );
    };

export default DomSizeResults;