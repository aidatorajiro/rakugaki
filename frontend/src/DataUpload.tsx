import React, { useEffect } from "react";
import "./App.css";
import {
  Alert,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import base64 from "base64-js";
import { useState } from "react";
import {
  getProvider,
  getRakugakiLayers,
  calculateUint256ID,
} from "./utils";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import ShowHide from "./ShowHide";
import YamiMap from "./YamiMap";

function DataUpload() {
  async function handleUploadButton(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files !== null) {
        let buf = await e.target.files[0].arrayBuffer();
        let b64str = base64.fromByteArray(new Uint8Array(buf));
        let url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
          url = "http://localhost:3001/compress/"
        } else {
          url = "https://rakugaki.aidatorajiro.dev/compress/compress/"
        }
        let res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: b64str }),
        });
        let compressed: string = (await res.json())["data"];

        const acpr = await getProvider();
        if (acpr) {
          const prov = acpr[1];
          const rakugakiLayers = await getRakugakiLayers(prov);
          await (await rakugakiLayers.addImage(
            calculateUint256ID(imageID),
            compressed,
          )).wait();
          downloadImageData();
        }
      }
    } catch (e) {
      setErrorMessage(String(e));
    }
  }

  const [imageID, setImageID] = useState("0");

  if (YamiMap(imageID) !== imageID) {
    setImageID(YamiMap(imageID))
  }

  const [imageData, setImageData] = useState<{
    image: string;
    timestamp: BigInt;
  }>({
    image: "",
    timestamp: BigInt("0"),
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
      const acpr = await getProvider();
      if (acpr) {
        const prov = acpr[1];
        const rakugakiLayers = await getRakugakiLayers(prov);
        const d = await rakugakiLayers
          .getLayer(calculateUint256ID(imageID));
        setImageData(d);
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
      <Typography variant="h4">
        Data Upload
      </Typography>
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
      <ShowHide in={Boolean(imageData.timestamp.toString() !== "0")}>
          <img alt="uploaded file" src={imageData.image} />
      </ShowHide>
      <ShowHide in={Boolean(imageData.timestamp.toString() === "0")}>
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
      </ShowHide>
      <ShowHide in={Boolean(errorMessage)}>
        <Alert severity="error">
          {errorMessage}
          <Button onClick={() => setErrorMessage("")} color="primary">
            CLOSE
          </Button>
        </Alert>
      </ShowHide>
    </Stack>
  );
}

export default DataUpload;
