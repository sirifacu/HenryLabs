import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {BrowserRouter, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompleteProfile from './components/completeProfile/CompleteProfile'
import Dashboard from './components/dashboard/main/dashboard';
import PasswordReset from './components/passwordReset/PasswordReset'
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./components/logIn/Login";
import {PrivateRoute, PublicRoute} from "./components/ProtectedRoute";

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
          {force === 'pending' && <Redirect to='/completar-perfil'/>}
          <PublicRoute restricted={true} exact path='/' component={Login}/>
          <PublicRoute path='/cambiar-clave' component={PasswordReset}/>
          <PrivateRoute path='/completar-perfil' component={CompleteProfile}/>
          <PrivateRoute path='/panel' component={Dashboard}/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
