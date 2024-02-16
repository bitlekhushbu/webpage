// AvoidRedirectsResults.js
import React from 'react';


const AvoidRedirectsResults = ({ data }) => {
    return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Redirects</th>
              <th>Wasted Time</th>
            </tr>
          </thead>
          <tbody>
            { data.items && data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.url}</td>
                <td>{item.redirects}</td>
                <td>{item.wastedMs.toFixed(2)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

export default AvoidRedirectsResults;