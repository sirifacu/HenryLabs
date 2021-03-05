import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import CompleteProfile from './components/completeProfile/CompleteProfile'
import Login from "./components/logIn/Login";
import PrivateRoute from "./components/ProtectedRoute";

function App() {

  const palette = useSelector(state => state.darkModeReducer.palette)
  const force = sessionStorage.getItem('force')
  
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
          {force === 'pending' && <Redirect to='/complete profile'/>}
          <Route exact path='/'><Login/></Route>
          <PrivateRoute path='/dashboard'><Dashboard /></PrivateRoute>
          <Route path='/complete profile'><CompleteProfile/></Route>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
