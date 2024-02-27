// PreloadLCPImageResults.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar } from '@mui/material';


const PreloadLCPImageResults = ({ data }) => {
   
return (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Path</TableCell>
          <TableCell>Image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items && data.items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography>{item.title}</Typography>
            </TableCell>
            <TableCell>
              <Typography>Path: {item.path}</Typography>
            </TableCell>
            <TableCell>
              <Avatar alt={item.title} src={item.path} variant="rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
  
};

export default  PreloadLCPImageResults;