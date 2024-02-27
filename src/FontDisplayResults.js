// FontDisplayResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';


const FontDisplayResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Potential Savings (ms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details && data.details.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell><Link href={item.url} target="_blank" rel="noreferrer">{item.url}</Link></TableCell>
              <TableCell>{item.wastedMs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default FontDisplayResults;