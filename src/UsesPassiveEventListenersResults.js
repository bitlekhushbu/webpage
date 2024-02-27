// UsesPassiveEventListenersResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const UsesPassiveEventListenersResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details && data.details.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>URL: <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.url}</a></p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default UsesPassiveEventListenersResults;