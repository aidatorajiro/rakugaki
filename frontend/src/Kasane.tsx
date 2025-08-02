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
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  calculateUint256ID,
  getRakugakiNFT,
  getProvider,
  getLayerDatabaseAddress,
  getRakugakiConfig,
} from "./utils";
import ShowHide from "./ShowHide";
import YamiMap from "./YamiMap";
import { NetworkConfig } from "./Addresses";

function Kasane() {
  const [tokenID, setTokenID] = useState("0");
  const [otherData, setOtherData] = useState("[]");
  const [layers, setLayers] = useState("[]");
  const [serial, setSerial] = useState("R-");
  const [generator, setGenerator] = useState("");
  const [svgData, setSVGData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latestConfig, setLatestConfig] = useState<NetworkConfig>();

  useEffect(() => {
    (async () => {
      const acpr = await getProvider();
      if (!acpr) {
        return;
      }
      const prov = acpr[1];
      const config = await getRakugakiConfig(prov);
      setLatestConfig(config);
    })();
  }, []);

  function addressChoice() {
    return latestConfig?.generators.map((x) => {
      return (
        <MenuItem value={x.address}>
          {x.name} | {x.description} | レイヤー数：{x.layerRange[0]}枚から
          {x.layerRange[1]}枚まで
        </MenuItem>
      );
    });
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
        const layer_addr = await getLayerDatabaseAddress(prov);
        if (!layer_addr) {
          return;
        }
        const rakugakiNFT = await getRakugakiNFT(prov);
        const p = (x: string) =>
          (JSON.parse(x) as [string | number])
            .map(String)
            .map(YamiMap)
            .map(calculateUint256ID);
        await (
          await rakugakiNFT.mint(
            tokenID,
            JSON.parse(otherData),
            p(layers),
            serial,
            layer_addr,
            generator,
          )
        ).wait();
        downloadSVGData();
      }
    } catch (e) {
      setErrorMessage(String(e));
    }
  }

  const downloadSVGData = useCallback(
    async function () {
      const acpr = await getProvider();
      if (acpr) {
        const prov = acpr[1];
        const rakugakiNFT = await getRakugakiNFT(prov);
        try {
          await rakugakiNFT.mint.estimateGas(
            calculateUint256ID(tokenID),
            [],
            [],
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
          );
          setSVGData("");
        } catch (_e) {
          try {
            const d = await rakugakiNFT.tokenURI(calculateUint256ID(tokenID));
            setSVGData(JSON.parse(d).image);
          } catch (_e) {
            setSVGData("genfail.png");
          }
        }
      }
    },
    [tokenID],
  );

  useEffect(() => {
    downloadSVGData();
  }, [tokenID, downloadSVGData]);

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4">Make Layers</Typography>
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
        <img
          alt={
            svgData !== "genfail.png"
              ? "full on-chain NFT svg data"
              : "failed to generate SVG data !"
          }
          src={svgData}
        />
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
            >
              {addressChoice()}
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
