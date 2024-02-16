// UserTimingsData.js
import React from 'react';


const UserTimingsData = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Start Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {data.details && data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.timingType}</td>
                  <td>{item.startTime} ms</td>
                  <td>{item.duration} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default UserTimingsData;