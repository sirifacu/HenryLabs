import { makeStyles } from '@material-ui/core';

 export const UseStylesResetPassword = makeStyles(theme => ({
        container:{
            display:"flex",
            alignItems:"center",
            flexDirection: "column",
        },
        content: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: theme.spacing(16)
        },
        inputContainer:{
            display:"flex",
            alignItems:"center",
            justifyContent: "center",
        },   
        logoContainer: {
            width: "30%",
        },
        logo: {
            width: "50%",
        },
        appBar: {
            position: "relative",
            width: "100%"
        },
        input: {
            width: "80%"
        }
    }))