// AvoidRedirectsResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AvoidRedirectsResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Redirects</TableCell>
            <TableCell>Wasted Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.url}</TableCell>
              <TableCell>{item.redirects}</TableCell>
              <TableCell>{item.wastedMs.toFixed(2)} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default AvoidRedirectsResults;