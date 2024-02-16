// NetworkRequestsResults.js
import React from 'react';

const NetworkRequestsResults = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Resource Type</th>
                <th>Resource Size</th>
                <th>Network Request Time</th>
                <th>Priority</th>
                
              </tr>
            </thead>
            <tbody>
            {data.details &&
              data.details.items
                .sort((a, b) => {
                  if (a.priority === "Low" && b.priority !== "Low") {
                    return -1; // Low priority comes first
                  } else if (a.priority !== "Low" && b.priority === "Low") {
                    return 1; // Non-Low priority comes first
                  } else if (a.priority === "Low" && b.priority === "Low") {
                    // If both are Low priority, sort by resource size in descending order
                    return b.resourceSize - a.resourceSize;
                  } else {
                    // If priorities are the same, sort by resource size in ascending order
                    return a.resourceSize - b.resourceSize;
                  }
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a target="_blank" href={item.url} rel="noreferrer">
                        {item.url}
                      </a>
                    </td>
                    <td>{item.resourceType}</td>
                    <td>{item.resourceSize}</td>
                    <td>{item.networkRequestTime}</td>
                    <td>{item.priority}</td>
                  </tr>
                ))}
            </tbody>
          </table>
      );
    };

export default NetworkRequestsResults;
