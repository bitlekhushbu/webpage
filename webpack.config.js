const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),  // Polyfill for stream
      buffer: require.resolve('buffer/'),           // Polyfill for buffer
      // Add any other polyfills you need here
    },
  },
  // Other Webpack configurations if necessary
};
