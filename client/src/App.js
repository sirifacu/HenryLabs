import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/dashboard/main/dashboard';
import Swal from 'sweetalert2';

function App() {

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
      background:{
        default: "#fafafa"
      }
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Dashboard />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
