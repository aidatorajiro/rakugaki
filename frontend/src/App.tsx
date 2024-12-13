import "./App.css";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import DataUpload from "./DataUpload";
import Kasane from "./Kasane";
import {useState} from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f76fd3",
    },
    secondary: {
      main: "#efe35b",
    },
  },
});

function App() {
  const [chainID, setChainID] = useState(0xe708)
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <DataUpload />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Kasane />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
