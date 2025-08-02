import "./App.css";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import DataUpload from "./DataUpload";
import Kasane from "./Kasane";

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
      <Grid container>
        <Grid size={{xs: 12, lg: 6}}>
          <DataUpload />
        </Grid>
        <Grid size={{xs: 12, lg: 6}}>
          <Kasane />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
