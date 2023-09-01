import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import {
    Alert,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  calculateUint256ID,
  getRakugakiNFT,
  getWeb3,
  rakugakiLayersAddress,
  runCall,
} from "./utils";
import { ResponseError } from "web3";

function Kasane() {
  const [tokenID, setTokenID] = useState("0");
  const [otherData, setOtherData] = useState("[]");
  const [layers, setLayers] = useState("[]");
  const [serial, setSerial] = useState("CCBT-");
  const [generator, setGenerator] = useState(
    "0x06ae046986A584514E343fe6E3494D15E713E37a",
  );
  const [svgData, setSVGData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function addressChoice(address: string, comment: string) {
    return (
      <MenuItem value={address}>
        {comment} ({address})
      </MenuItem>
    );
  }

  function increaseCount() {
    if (tokenID.match(/^[0-9]+$/)) {
      setTokenID((BigInt(tokenID) + BigInt("1")).toString());
    }
  }

  function decreaseCount() {
    if (tokenID.match(/^[0-9]+$/) && tokenID !== "0") {
      setTokenID((BigInt(tokenID) + BigInt("-1")).toString());
    }
  }

  async function handleKasaneButton() {
    const acw3 = await getWeb3();
    if (acw3) {
      const [accounts, web3] = acw3;
      const rakugakiNFT = getRakugakiNFT(web3);
      const p = (x: string) =>
        (JSON.parse(x) as [string | number])
          .map(String)
          .map(calculateUint256ID);
      const transaction = rakugakiNFT.methods.mint(
        tokenID,
        JSON.parse(otherData),
        p(layers),
        serial,
        rakugakiLayersAddress,
        generator,
      );
      await runCall(web3, rakugakiNFT, transaction, accounts[0]);
      downloadSVGData();
    }
  }

  async function downloadSVGData() {
    try {
        const acw3 = await getWeb3();
        if (acw3) {
          const web3 = acw3[1];
          const rakugakiNFT = getRakugakiNFT(web3);
          const d = await rakugakiNFT.methods
            .tokenURI(calculateUint256ID(tokenID))
            .call();
          setSVGData(JSON.parse(d).image);
        }
      } catch (e) {
        if (e instanceof ResponseError) {
          if (e.data === undefined) {
            setSVGData("");
          } else {
            setSVGData("genfail.png");
          }
        }
    }
  }

  useEffect(() => {
    downloadSVGData();
  }, [tokenID]);

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <TextField
        color="secondary"
        label="Token ID"
        variant="outlined"
        value={tokenID}
        onChange={(e) => setTokenID(e.target.value)}
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
      <TextField
        color="secondary"
        label="Other Data"
        variant="outlined"
        value={otherData}
        onChange={(e) => setOtherData(e.target.value)}
      />
      <TextField
        color="secondary"
        label="Layers"
        variant="outlined"
        value={layers}
        onChange={(e) => setLayers(e.target.value)}
      />
      <TextField
        color="secondary"
        label="Serial Code"
        variant="outlined"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel color="secondary" id="demo-simple-select-label">
          SVG Generator
        </InputLabel>
        <Select
          color="secondary"
          value={generator}
          onChange={(e) => setGenerator(e.target.value)}
          label="SVG Generator"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0x06ae046986A584514E343fe6E3494D15E713E37a"}
        >
          {addressChoice(
            "0x06ae046986A584514E343fe6E3494D15E713E37a",
            "disp 2L",
          )}
        </Select>
      </FormControl>
      <Zoom in={!Boolean(svgData)}>
      <Button
        sx={{ p: 1 }}
        component="label"
        variant="contained"
        color="secondary"
        onClick={handleKasaneButton}
      >
        Kasaneru
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
      <Zoom in={Boolean(svgData)}>
        <img alt={svgData !== "genfail.png" ? 'full on-chain NFT svg data' : 'failed to generate SVG data !'} src={svgData} />
      </Zoom>
    </Stack>
  );
}

export default Kasane;
