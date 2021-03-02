import { makeStyles } from '@material-ui/core/styles';
import JS from './images/JS.png';
import ReactJS from './images/ReactJS.png';
import NodeExpress from './images/NodeExpress.png';
import SQL from './images/SQL.png';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    iconSize: { 
        fontSize: 110,
        cursor: 'pointer'
    },
    marginX: {
        marginLeft: '8px',
        marginRight: '8px',
    },
    marginL: {
        marginLeft: '7px',
        cursor: 'pointer'
    },
    marginT: {
        marginTop: '15px'
    },
    description: {
        textIndent: '20px',
        padding: '35px'
    }
});

export const modulesData = [
    {
        title: 'Module 1 - Javascript',
        description: "Principios básicos de Javascript, estructuras de datos y algoritmos.",
        image: JS
    },
    {
        title: 'Module 2 - React',
        description: "DOM, estilos, frontend con React y Redux.",
        image: ReactJS
    },
    {
        title: 'Module 3 - NodeJS',
        description: "Servidores, NodeJS, promesas, y Express.",
        image: NodeExpress
    },
    {
        title: 'Module 4 - BD y SQL',
        description: "Bases de datos relacionales, SQL y Sequelize.",
        image: SQL
    }
]

export default useStyles