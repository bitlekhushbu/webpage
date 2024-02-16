// UnsizedImagesResults.js
import React from 'react';

const UnsizedImagesResults = ({ data }) => {
  return (
    <ul>
      {data.items && data.items.map((item, index) => (
        <li key={index}>
          <p>{item.title}</p>
          <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
          <p>Path: {item.path}</p>
          <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </li>
      ))}
    </ul>
  );
};

export default UnsizedImagesResults;
