import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import CompleteProfile from './components/completeProfile/CompleteProfile'
import decode from "jwt-decode";
import Login from "./components/logIn/Login";

function App() {

  const palette = useSelector(state => state.darkModeReducer.palette)
  const force = localStorage.getItem('force')
  
  var theme = createMuiTheme({
    palette: {
      type: palette.type,
      primary: {
        light: palette.primaryLight,
        main: palette.primaryMain,
        darker: palette.primaryDarker,
      },
      secondary: {
        light: palette.secondaryLight,
        main: palette.secondaryMain,
        darker: palette.secondaryDarker,
      },
      background:{
        default: palette.background
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Route exact path='/'><Login/></Route>
          <Route path='/dashboard'><Dashboard /></Route>
          <Route path='/complete profile'><CompleteProfile/></Route>
          {force === 'Pending' && <Redirect to='/complete profile'/>}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
