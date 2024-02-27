// ServerResponseTimeData.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Typography } from '@mui/material';


const ServerResponseTimeData = ({ data }) => {
    
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
              <Link target="_blank" href={item.url} rel="noreferrer">
                {item.url}
              </Link>
            </TableCell>
            <TableCell>
              <Typography>{item.responseTime} ms</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
    };

export default ServerResponseTimeData;