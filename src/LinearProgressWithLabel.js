import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <LinearProgress variant="determinate" value={value} />
      <Typography variant="caption" color="textSecondary">{`${Math.round(value)}%`}</Typography>
    </Box>
  );
};

export default LinearProgressWithLabel;
