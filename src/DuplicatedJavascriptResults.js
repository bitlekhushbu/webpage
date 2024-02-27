//DuplicatedJavascriptResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const DuplicatedJavascriptResults = ({ data }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Total Bytes</TableCell>
            <TableCell>Wasted Bytes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.url}</TableCell>
              <TableCell>{item.totalBytes}</TableCell>
              <TableCell>{item.wastedBytes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
};

export default  DuplicatedJavascriptResults;