// NetworkRequestsResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const NetworkRequestsResults = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Resource Type</TableCell>
            <TableCell>Resource Size</TableCell>
            <TableCell>Network Request Time</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.details &&
            data.details.items
              .sort((a, b) => {
                if (a.priority === "Low" && b.priority !== "Low") {
                  return -1; // Low priority comes first
                } else if (a.priority !== "Low" && b.priority === "Low") {
                  return 1; // Non-Low priority comes first
                } else if (a.priority === "Low" && b.priority === "Low") {
                  // If both are Low priority, sort by resource size in descending order
                  return b.resourceSize - a.resourceSize;
                } else {
                  // If priorities are the same, sort by resource size in ascending order
                  return a.resourceSize - b.resourceSize;
                }
              })
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a target="_blank" href={item.url} rel="noreferrer">
                      {item.url}
                    </a>
                  </TableCell>
                  <TableCell>{item.resourceType}</TableCell>
                  <TableCell>{item.resourceSize}</TableCell>
                  <TableCell>{item.networkRequestTime}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    };

export default NetworkRequestsResults;
