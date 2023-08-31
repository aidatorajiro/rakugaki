import React, { useEffect } from 'react';
import './App.css';
import { Alert, Box, Button, Link, Stack, TextField, Zoom, createTheme } from '@mui/material';
import base64 from 'base64-js'
import { useState } from 'react'
import {getWeb3, getRakugakiLayers, runCall} from "./utils";
import Web3, { MatchPrimitiveType } from 'web3';
import { NonPayableMethodObject } from 'web3-eth-contract';
import { keccak256 } from 'web3-utils';


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


function DataUpload() {
  async function handleUploadButton(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files !== null) {
        let buf = await e.target.files[0].arrayBuffer();
        let b64str = base64.fromByteArray(new Uint8Array(buf));
        let res = await fetch('http://localhost:3001/compress/', {
          method: 'POST', headers: {
          "Content-Type": "application/json"},
          body: JSON.stringify({data: b64str})
        });
        let compressed: string = (await res.json())['data']

        const acw3 = await getWeb3();
        if (acw3) {
          const [accounts, web3] = acw3;
          const rakugakiLayers = getRakugakiLayers(web3);
          const transaction = rakugakiLayers.methods.addImage(imageID, compressed);
          runCall(web3, rakugakiLayers, transaction, accounts[0])
        }
      }
    } catch (e) {
      setErrorMessage(String(e))
    }
  }

  const [imageID, setImageID] = useState('0');
  const [imageData, setImageData] = useState<{image: string, timestamp: MatchPrimitiveType<"uint256", unknown>}>({
    image: '',
    timestamp: Web3.utils.toBigInt('0')
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      let imageIDProcessed;
      if (!imageID.match(/^[0-9]+$/)) {
        imageIDProcessed = keccak256(imageID)
      } else {
        imageIDProcessed = imageID
      }
      try {
        const acw3 = await getWeb3();
        if (acw3) {
          const [accounts, web3] = acw3;
          const rakugakiLayers = getRakugakiLayers(web3);
          const d = await rakugakiLayers.methods.getLayer(imageIDProcessed).call();
          if (d.timestamp.toString() !== '0') {
            setImageData(d)
          } else {
            setImageData(d)
          }
        }
      } catch (e) {

      }
    })();
  },[imageID])

  return (
    <Stack direction="column" spacing={2} sx={{p: 2}}>
        <TextField label="Image ID" variant="outlined" value={imageID} onChange={e => setImageID(e.target.value)}/>
        <Zoom in={Boolean(imageData.timestamp.toString() === '0')}>
        <Button sx={{p:1}} component="label" variant="contained" color="primary">
          Upload Image File
          <input accept="image/png, image/jpeg" className="hiddeninput" type="file" onChange={handleUploadButton}/>
        </Button>
        </Zoom>
        <Zoom in={Boolean(imageData.timestamp.toString() !== '0')}>
          <img src={imageData.image}/>
        </Zoom>
      <Zoom in={Boolean(errorMessage)}>
      <Alert severity="error">
        {errorMessage}
        <Button onClick={() => setErrorMessage('')} sx={{p:2, m: 2, display: 'block'}} color='primary'>CLOSE</Button>
      </Alert>
      </Zoom>
    </Stack>
  );
}

export default DataUpload;
