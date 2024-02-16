// LayoutShiftElementsResults.js
import React from 'react';


const LayoutShiftElementsResults = ({ data }) => {
    return (
        <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Weighted Score</th>
              </tr>
            </thead>
            <tbody>
            {data.details && data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.node && item.node.nodeLabel}</td>
                  <td>{item.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      );
    };

export default LayoutShiftElementsResults;