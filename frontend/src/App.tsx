import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
  primary: {
    main: '#f76fd3',
  },
  secondary: {
    main: '#efe35b'
  }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Button variant="contained" color="primary">
          Upload
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
