// CriticalRequestChainsResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';


const CriticalRequestChainsResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Time Spent (ms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </Link>
              </TableCell>
              <TableCell>{`${item.responseTime} ms`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default CriticalRequestChainsResults;