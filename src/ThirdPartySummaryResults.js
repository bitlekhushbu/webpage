// ThirdPartySummaryResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };
  

const ThirdPartySummaryResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Third Party:</TableCell>
            <TableCell>Transfer Size:</TableCell>
            <TableCell>Main Thread Time: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </TableCell>
              <TableCell>{bytesToKiB(item.transferSize)} KiB</TableCell>
              <TableCell>{item.mainThreadTime} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThirdPartySummaryResults;
