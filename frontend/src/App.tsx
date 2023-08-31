import React from 'react';
import './App.css';
import { Box, Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import base64 from 'base64-js'
import Web3 from 'web3';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

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
  async function getWeb3(): Promise<[[string], Web3] | null> {
    const provider = await detectEthereumProvider({ silent: true })
    if (provider && window.ethereum) {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      if (accounts) {
        return [accounts as [string], new Web3(window.ethereum)]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  async function handleUploadButton(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      let buf = await e.target.files[0].arrayBuffer();
      let b64str = base64.fromByteArray(new Uint8Array(buf));
      let res = await fetch('http://localhost:3001/compress/', {
        method: 'POST', headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({data: b64str})
      });
      let compressed = (await res.json())['data']

      const acw3 = await getWeb3();
      if (acw3) {
        const [accounts, web3] = acw3;
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} sx={{p: 2}}>
        <TextField label="Image ID" variant="outlined" />
        <Button sx={{p:1}} component="label" variant="contained" color="primary">
          Upload Image File
          <input accept="image/png, image/jpeg" className="hiddeninput" type="file" onChange={handleUploadButton}/>
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
