//  UsesRelPreconnectResults.js
import React from 'react';


const UsesRelPreconnectResults = ({ data }) => {
    return (
        <div>
          <h3>Warnings:</h3>
          <ul>
            {data.warnings && data.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      );
    };

export default  UsesRelPreconnectResults;