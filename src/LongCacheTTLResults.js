// LongCacheTTLResults.js
import React from 'react';


const LongCacheTTLResults = ({ data }) => {
    return (
       
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Cache Lifetime</th>
            </tr>
          </thead>
          <tbody>
            {data.items && data.items.map((item, index) => (
              <tr key={index}>
                <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                <td>{item.cacheLifetimeMs} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
  );
    };

export default LongCacheTTLResults;