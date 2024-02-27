// TotalByteWeightResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const TotalByteWeightResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Transfer Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details && data.details.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </TableCell>
              <TableCell>{item.totalBytes} bytes</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default TotalByteWeightResults;