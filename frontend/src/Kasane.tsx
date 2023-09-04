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
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  calculateUint256ID,
  getRakugakiNFT,
  getProvider,
  rakugakiLayersAddress,
} from "./utils";
import * as ethers from "ethers";
import ShowHide from "./ShowHide";
import YamiMap from "./YamiMap";

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
        {comment}
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
    try {
    const acpr = await getProvider();
    if (acpr) {
      const prov = acpr[1];
      const rakugakiNFT = await getRakugakiNFT(prov);
      const p = (x: string) =>
        (JSON.parse(x) as [string | number])
          .map(String)
          .map(YamiMap)
          .map(calculateUint256ID);
      await (await rakugakiNFT.mint(
        tokenID,
        JSON.parse(otherData),
        p(layers),
        serial,
        rakugakiLayersAddress,
        generator,
      )).wait();
      downloadSVGData();
    }
    } catch (e) {
      setErrorMessage(String(e));
    }
  }

  async function downloadSVGData() {
    try {
        const acpr = await getProvider();
        if (acpr) {
          const prov = acpr[1];
          const rakugakiNFT = await getRakugakiNFT(prov);
          const d = await rakugakiNFT
            .tokenURI(calculateUint256ID(tokenID));
          setSVGData(JSON.parse(d).image);
        }
      } catch (e) {
        if (ethers.isError(e, "CALL_EXCEPTION")) {
          if (e.data !== null) {
            setSVGData("genfail.png");
          } else {
            setSVGData("");
          }
        }
    }
  }

  useEffect(() => {
    downloadSVGData();
  }, [tokenID]);

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4">
        Make Layers
      </Typography>
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
          aria-label="decrease count"
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={increaseCount}
          color="primary"
          aria-label="increase count"
        >
          <NavigateNext />
        </IconButton>
      </Stack>
      <ShowHide in={Boolean(svgData)}>
        <img alt={svgData !== "genfail.png" ? 'full on-chain NFT svg data' : 'failed to generate SVG data !'} src={svgData} />
      </ShowHide>
      <ShowHide in={!Boolean(svgData)}>
      <Stack direction="column" spacing={2} sx={{ p: 0 }}>
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
            "disp - レイヤー2枚",
          )}
          {addressChoice(
            "0x1DDD1318d7EeB90C2B9B16a688DCd108781BFFB3",
            "serialkasane ver.1 - レイヤー5枚のみ",
          )}
          {addressChoice(
            "0x3e153313A12c528E988b544Ea39f2c0D51E5399F",
            "serialkasane ver.2 - レイヤー5枚のみ",
          )}
          {addressChoice(
            "0x8c93fD1537529cEd54F8c0D43dC644883Fc55E4b",
            "serialkasane ver.3 - レイヤー5枚のみ",
          )}
          {addressChoice(
            "0x2b4C1B113cC63aAc3772c1214C696645315a2512",
            "serialkasane ver.4 - レイヤー1枚から5枚",
          )}
          {addressChoice(
            "0xEB9a3727794bBf96e95727D59a3a09937684c72E",
            "普通の重ね ver.1 - レイヤー枚数4以上",
          )}
          {addressChoice(
            "0xd3884bcbd37a280ffd7fa344bb72150f6dc85362",
            "普通の重ね ver.2 - レイヤー枚数任意",
          )}
        </Select>
      </FormControl>
      <Button
        sx={{ p: 1 }}
        component="label"
        variant="contained"
        color="secondary"
        onClick={handleKasaneButton}
      >
        Kasaneru
      </Button>
      </Stack>
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

export default Kasane;
