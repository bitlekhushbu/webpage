// MainThreadWorkBreakdownResults.js
import React from 'react';


const MainThreadWorkBreakdownResults = ({ data }) => {
    return (
        <table>
        <thead>
          <tr>
            <th>category</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
        {data.items && data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.groupLabel}</td>
              <td>{item.duration.toFixed(0)} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );
    };

export default MainThreadWorkBreakdownResults;