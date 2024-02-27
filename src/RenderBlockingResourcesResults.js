// RenderBlockingResourcesResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

const RenderBlockingResourcesResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Total Bytes</TableCell>
            <TableCell>Wasted Milliseconds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items && data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>
                  <a target="_blank" href={item.url} rel="noreferrer">
                    {item.url}
                  </a>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{bytesToKiB(item.totalBytes)} KiB</Typography>
              </TableCell>
              <TableCell>
                <Typography>{item.wastedMs} ms</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default RenderBlockingResourcesResults;