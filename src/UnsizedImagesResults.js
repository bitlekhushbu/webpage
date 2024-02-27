// UnsizedImagesResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Typography } from '@mui/material';


const UnsizedImagesResults = ({ data }) => {

return (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>Path</TableCell>
          <TableCell>Image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items && data.items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography>{item.title}</Typography>
            </TableCell>
            <TableCell>
              <Link target="_blank" href={item.url} rel="noreferrer">
                {item.url}
              </Link>
            </TableCell>
            <TableCell>
              <Typography>{item.path}</Typography>
            </TableCell>
            <TableCell>
              <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
};

export default UnsizedImagesResults;
