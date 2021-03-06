import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import CompleteProfile from './components/completeProfile/CompleteProfile'
import Login from "./components/logIn/Login";
import {PrivateRoute, PublicRoute} from "./components/ProtectedRoute";
import StudentLectures from "./components/dashboard/studentLectures/StudentLectures";

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
          {force === 'pending' && <Redirect to='/complete_profile'/>}
          <PublicRoute restricted={true} exact path='/' component={Login}/>
          <PrivateRoute path='/complete_profile' component={CompleteProfile}/>
          <PrivateRoute path='/dashboard' component={Dashboard}/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
