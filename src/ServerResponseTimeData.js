// ServerResponseTimeData.js
import React from 'react';


const ServerResponseTimeData = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Time Spent (ms)</th>
              </tr>
            </thead>
            <tbody>
            {data.items && data.items.map((item, index) => (
                <tr key={index}>
                  <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                  <td>{item.responseTime} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default ServerResponseTimeData;