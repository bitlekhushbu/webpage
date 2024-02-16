//  NoDocumentWriteResults.js
import React from 'react';


const NoDocumentWriteResults = ({ data }) => {
    return (
        <ul>
        {data.items && data.items.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>Path: {item.path}</p>
            <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </li>
        ))}
      </ul> );
};

export default  NoDocumentWriteResults;