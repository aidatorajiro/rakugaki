import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import DataUpload from './DataUpload';
import Kasane from './Kasane';

const theme = createTheme({
  palette: {
  primary: {
    main: '#f76fd3'
  },
  secondary: {
    main: '#efe35b'
  }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataUpload/>
      <Kasane/>
    </ThemeProvider>
  );
}

export default App;
