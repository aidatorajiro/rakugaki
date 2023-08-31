import "./App.css";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import DataUpload from "./DataUpload";
import Kasane from "./Kasane";
import { Stack } from "@mui/system";

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
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing="3em">
        <Grid item xs={6}>
          <DataUpload />
        </Grid>
        <Grid item xs={6}>
          <Kasane />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
