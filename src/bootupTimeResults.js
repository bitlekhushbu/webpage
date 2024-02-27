// bootupTimeResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

const bootupTimeResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Total CPU Time</TableCell>
            <TableCell>Script Evaluation</TableCell>
            <TableCell>Script Parse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details && data.details.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </Link>
              </TableCell>
              <TableCell>{`${item.total.toFixed(0)} ms`}</TableCell>
              <TableCell>{`${item.scripting.toFixed(0)} ms`}</TableCell>
              <TableCell>{`${item.scriptParseCompile.toFixed(0)} ms`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
};

export default  bootupTimeResults;