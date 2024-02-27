// UnusedJavascriptResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };


const UnusedJavascriptResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Transfer Size (KiB)</TableCell>
            <TableCell>Potential Savings (KiB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <a target="_blank" href={item.url} rel="noreferrer">
                  {item.url}
                </a>
              </TableCell>
              <TableCell>{bytesToKiB(item.totalBytes)} KiB</TableCell>
              <TableCell>{bytesToKiB(item.wastedBytes)} KiB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UnusedJavascriptResults;
