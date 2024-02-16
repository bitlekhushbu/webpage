// UsesPassiveEventListenersResults.js
import React from 'react';


const UsesPassiveEventListenersResults = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
            {data.details && data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <p>URL: <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.url}</a></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default UsesPassiveEventListenersResults;