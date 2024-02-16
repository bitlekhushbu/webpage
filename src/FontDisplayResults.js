// FontDisplayResults.js
import React from 'react';


const FontDisplayResults = ({ data }) => {
    return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Potential Savings (ms)</th>
            </tr>
          </thead>
          <tbody>
            {data.details && data.details.items.map((item, index) => (
              <tr key={index}>
                <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                <td>{item.wastedMs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

export default FontDisplayResults;