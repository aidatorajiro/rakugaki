import React, { useEffect } from "react";
import "./App.css";
import {
  Alert,
  Button,
  IconButton,
  Stack,
  TextField,
  Zoom,
} from "@mui/material";
import base64 from "base64-js";
import { useState } from "react";
import {
  getWeb3,
  getRakugakiLayers,
  runCall,
  calculateUint256ID,
} from "./utils";
import Web3, { MatchPrimitiveType } from "web3";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";

function DataUpload() {
  async function handleUploadButton(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files !== null) {
        let buf = await e.target.files[0].arrayBuffer();
        let b64str = base64.fromByteArray(new Uint8Array(buf));
        let res = await fetch("http://localhost:3001/compress/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: b64str }),
        });
        let compressed: string = (await res.json())["data"];

        const acw3 = await getWeb3();
        if (acw3) {
          const [accounts, web3] = acw3;
          const rakugakiLayers = getRakugakiLayers(web3);
          const transaction = rakugakiLayers.methods.addImage(
            calculateUint256ID(imageID),
            compressed,
          );
          await runCall(web3, rakugakiLayers, transaction, accounts[0]);
          downloadImageData();
        }
      }
    } catch (e) {
      setErrorMessage(String(e));
    }
  }

  const [imageID, setImageID] = useState("0");
  const [imageData, setImageData] = useState<{
    image: string;
    timestamp: MatchPrimitiveType<"uint256", unknown>;
  }>({
    image: "",
    timestamp: Web3.utils.toBigInt("0"),
  });
  const [errorMessage, setErrorMessage] = useState("");

  function increaseCount() {
    if (imageID.match(/^[0-9]+$/)) {
      setImageID((BigInt(imageID) + BigInt("1")).toString());
    }
  }

  function decreaseCount() {
    if (imageID.match(/^[0-9]+$/) && imageID !== "0") {
      setImageID((BigInt(imageID) + BigInt("-1")).toString());
    }
  }

  async function downloadImageData() {
    try {
      const acw3 = await getWeb3();
      if (acw3) {
        const web3 = acw3[1];
        const rakugakiLayers = getRakugakiLayers(web3);
        const d = await rakugakiLayers.methods
          .getLayer(calculateUint256ID(imageID))
          .call();
        if (d.timestamp.toString() !== "0") {
          setImageData(d);
        } else {
          setImageData(d);
        }
      }
    } catch (e) {
      setErrorMessage(String(e));
    }
  }

  useEffect(() => {
    downloadImageData();
  }, [imageID]);

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <TextField
        label="Image ID"
        variant="outlined"
        value={imageID}
        onChange={(e) => setImageID(e.target.value)}
      />
      <Stack direction="row" justifyContent="center">
        <IconButton
          onClick={decreaseCount}
          color="primary"
          aria-label="add to shopping cart"
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={increaseCount}
          color="primary"
          aria-label="add to shopping cart"
        >
          <NavigateNext />
        </IconButton>
      </Stack>
      <Zoom in={Boolean(imageData.timestamp.toString() !== "0")}>
        <img alt="uploaded file" src={imageData.image} />
      </Zoom>
      <Zoom in={Boolean(imageData.timestamp.toString() === "0")}>
        <Button
          sx={{ p: 1 }}
          component="label"
          variant="contained"
          color="primary"
        >
          Upload Image File
          <input
            accept="image/png, image/jpeg"
            className="hiddeninput"
            type="file"
            onChange={handleUploadButton}
          />
        </Button>
      </Zoom>
      <Zoom in={Boolean(errorMessage)}>
        <Alert severity="error">
          {errorMessage}
          <Button onClick={() => setErrorMessage("")} color="primary">
            CLOSE
          </Button>
        </Alert>
      </Zoom>
    </Stack>
  );
}

export default DataUpload;
