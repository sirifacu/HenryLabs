import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import Login from "./components/logIn/Login";

function App() {

  const palette = useSelector(state => state.darkModeReducer.palette)

  var theme = createMuiTheme({
    palette: {
      type: palette.type,
      primary: {
        main: palette.primaryMain,
        darker: palette.primaryDarker,
      },
      secondary: {
        main: palette.secondaryMain,
        darker: palette.secondaryDarker,
      },
      background:{
        default: palette.background
      }
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Route path='/dashboard'><Dashboard /></Route>
        </div>
          <Route exact path='/'><Login/></Route>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
