// LayoutShiftElementsResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const LayoutShiftElementsResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Element</TableCell>
            <TableCell>Weighted Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details && data.details.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.node && item.node.nodeLabel}</TableCell>
              <TableCell>{item.score.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default LayoutShiftElementsResults;