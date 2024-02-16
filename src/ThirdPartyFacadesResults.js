// ThirdPartyFacadesResults.js
import React from 'react';


const ThirdPartyFacadesResults = ({ data }) => {
    return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Facades</th>
              <th>Wasted Ms</th>
            </tr>
          </thead>
          <tbody>
          {data.items && data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.url}</td>
                <td>{item.facades}</td>
                <td>{item.wastedMs.toFixed(2)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
  );
  
};

export default  ThirdPartyFacadesResults;