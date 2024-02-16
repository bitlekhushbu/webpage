//DuplicatedJavascriptResults.js
import React from 'react';


const DuplicatedJavascriptResults = ({ data }) => {

    return (
        <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Total Bytes</th>
                  <th>Wasted Bytes</th>
                </tr>
              </thead>
              <tbody>
              { data.items && data.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.url}</td>
                    <td>{item.totalBytes}</td>
                    <td>{item.wastedBytes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    );
  
};

export default  DuplicatedJavascriptResults;