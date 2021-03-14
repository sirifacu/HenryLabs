import { makeStyles } from '@material-ui/core'


export const useStylesLogin = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#000'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    width:'100%',
  },
  eyeContainer:{
    position: 'relative',
    display: 'flex',
  },
  eyePass:{
    cursor: 'pointer',
    position: 'absolute',
    right: 5,
    bottom: 30,
    color: '#BABEBD',
    fontSize: 20
  }
}));
