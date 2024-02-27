// UsesOptimizedImagesResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const UsesOptimizedImagesResults = ({ data }) => {
    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>Resource Size</TableCell>
                <TableCell>Potential Savings</TableCell>
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
                  <TableCell>{item.wastedBytes} bytes</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };

export default UsesOptimizedImagesResults;