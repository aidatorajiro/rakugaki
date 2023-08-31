import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ThemeProvider, createTheme } from '@mui/material';
import base64 from 'base64-js'

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
  async function handleUploadButton(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      let buf = await e.target.files[0].arrayBuffer();
      let b64str = base64.fromByteArray(new Uint8Array(buf));
      let res = await fetch('http://localhost:3001/compress/', {
        method: 'POST', headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({data: b64str})
      });
      let j = await res.json()
      console.log(j['data'])
    }
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
