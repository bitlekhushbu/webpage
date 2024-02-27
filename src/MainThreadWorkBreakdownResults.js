// MainThreadWorkBreakdownResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const MainThreadWorkBreakdownResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.groupLabel}</TableCell>
              <TableCell>{item.duration.toFixed(0)} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default MainThreadWorkBreakdownResults;