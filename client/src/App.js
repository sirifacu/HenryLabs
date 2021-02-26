import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useEffect} from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import Login from "./components/logIn/Login";
import Swal from 'sweetalert2';

function App() {

  const palette = useSelector(state => state.darkModeReducer.palette)
  const cumplañito = localStorage.getItem("cumplañito")

  const showAlert = (message) => {
    return Swal.fire({
      title: `Feliz cumplañito ${message}.`,
      text: 'De parte de todo el equipo de henry te deseamos un feliz cumpleaños y un prospero año nuevo.',
      width: 550,
      imageUrl:'https://image.freepik.com/vector-gratis/gente-feliz-personajes-celebrando-cumpleanos_82574-6675.jpg',
      imageAlt: "cumplañito",
      imageWidth: 300,
      padding: '3em',
      backdrop: `rgba(182, 179, 179, 0.4)`,
      showConfirmButton: false,
    });
  };

  useEffect(()=>{
    if(cumplañito){
      showAlert('leandro')
      localStorage.removeItem("cumplañito")
    }
  },[])


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
          <Route path='/dashboard'><Dashboard /></Route>
          <Route exact path='/'><Login/></Route>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
