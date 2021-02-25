import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./components/dashboard/main/dashboard";


function App() {

  var theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        ligth: "#7986cb",
        main: "#FFFF01",
        darker: "#303f9f",
      },
      secondary: {
        ligth: "#ff4081",
        main: "#f50057",
        darker: "#c51162",
      },
      background: {
        default: "#fafafa"
      }
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
