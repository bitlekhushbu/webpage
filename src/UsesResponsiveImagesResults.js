// UsesResponsiveImagesResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

const UsesResponsiveImagesResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Transfer Size</TableCell>
            <TableCell>Potential Savings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link target="_blank" href={item.url} rel="noreferrer">
                  {item.url}
                </Link>
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

export default UsesResponsiveImagesResults;