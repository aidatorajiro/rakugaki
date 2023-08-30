import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ThemeProvider, createTheme } from '@mui/material';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

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
  async function handleUploadButton() {
    await imagemin.buffer(Buffer.from([]), {
      plugins: [
        imageminWebp({quality: 50})
      ]
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Button component="label" variant="contained" color="primary">
          Upload Image File
          <input accept="image/png, image/jpeg" className="hiddeninput" type="file" onChange={handleUploadButton}/>
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
