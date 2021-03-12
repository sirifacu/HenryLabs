import { makeStyles } from '@material-ui/core'
import boom from '../../assets/boom.jpg'
import fullstack from '../../assets/fullstack.jpg'
import html from '../../assets/html.jpg'
import intro from '../../assets/intro.jpg'
import nota from '../../assets/nota.jpg'
import partTime from '../../assets/partTime.jpg'
import presentacion from '../../assets/presentacion.jpg'
import ronda from '../../assets/ronda.jpg'

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const images = [ boom, fullstack, html, intro, nota, partTime, presentacion, ronda ]
const index = Math.round(getRandomArbitrary(0, images.length-1)) 


export const useStylesLogin = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#000'
  },
  image: {
    backgroundImage: `url(${images[index]})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input:{
    width:'100%'
  }
}));
