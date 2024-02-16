// LongTasksResults.js
import React from 'react';


const LongTasksResults = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Start Time (ms)</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
            {data.details && data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.startTime}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default LongTasksResults;