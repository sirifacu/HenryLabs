// import React, { useState, useEffect } from 'react';
import React from 'react';
// import axios from 'axios';
// import { Grid, Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import ListOrders from './ordersList/ListOrders';
// import EditModal from './EditModal';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
// import {useDropzone} from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    PaperModal:{
      padding: theme.spacing(3)  
    },
    large: {
        width: theme.spacing(22),
        height: theme.spacing(22),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    root: {
        marginTop: 18,
        minWidth: 350
    },
    title: {
        fontSize: 20,
        marginBottom: theme.spacing(3),
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 18,
        marginBottom: theme.spacing(3),
        fontWeight: 'bold'
      },
    pos: {
        marginBottom: 7,
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
  }));

const chipStyles = {
    backgroundColor:'#d4cfc9',
    borderRadius: '200px 200px 200px 200px',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}

export default function Profile() {
    const classes = useStyles();
    // const userId = localStorage.getItem('userId')
    // const [user, setUser] = useState({})
    // const [url, setUrl] = useState('')
    // const [open, setOpen] = useState(false);
    // const [image, setImage] = useState({})
    // const [editor, setEditor] = useState(null)
    // const [imageProps, setImageProps] = useState({
    //     scale: 1.2,
    //     rotateScale: 1,
    // })

    // const initialUser = () => {
    //     axios.get(`/users/${userId}`).then(res =>  {
    //         setUser(res.data)
    //         return res.data
    //     })
    //     .then(res => setUrl(res.image))
    //     .catch(err => console.log(err))
    // }

    // useEffect( initialUser, [userId] )

    // const setEditorRef = editor => setEditor(editor);

    // const handleSave = (data) => {
    //     const img = editor.getImageScaledToCanvas().toDataURL()
    //     uploadPhoto(img)
    //     handleClose()

    //   }

    // const handleClose = () => {
    //     setOpen(false)
    //   };
    
    // const handleScale = (e) => {
    //     const scale = parseFloat(e.target.value)
    //     setImageProps({...imageProps,scale: scale})
    // }

    // const rotateScale = (e) => {
    //     const scale = parseFloat(e.target.value)
    //     e.preventDefault()
    //     setImageProps({...imageProps,rotateScale: scale})
    // }

    // const uploadPhoto = (file) => {
    //     const uploadURL = 'https://api.cloudinary.com/v1_1/henry-e/image/upload';
    //         const uploadPreset = 'rkbb4en8';
    //         const apikey = "555657752225283"

    //         const formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('upload_preset', uploadPreset);
    //         formData.append("api_key", apikey);

    //         fetch(uploadURL,{
    //             method: "POST",
    //             body: formData,
    //           })
    //           .then(r => r.json())
    //           .then(res => {
    //               axios.put(`/users/image/${userId}`, {url: res.url})
    //               return res.url
    //             })
    //           .then(res => setUrl(res))
    //           .catch(err => console.log(err))
            
    // }



    // const {getRootProps, getInputProps} = useDropzone({
    //     accept: 'image/*',
    //     multiple:  false,
    //     onDrop: acceptedFiles =>  {
    //         Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
    //         setImage(acceptedFiles[0])
    //         setOpen(true)
    //         }
    // })


    return (
        <>
        <Dialog 
        // onClose={handleClose} 
        aria-labelledby="simple-dialog-title" 
        // open={open}
        >
        <DialogTitle id="simple-dialog-title">Edit Avatar</DialogTitle>
            <Paper elevation={3} className={classes.PaperModal} >
                <Grid container   direction="column" justify="center" alignItems="center" spacing={2}> 
                    <Grid item>
                    <AvatarEditor
                        // ref={setEditorRef}
                        // image={image && image.preview}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={150}
                        color={[0, 0, 0, 0.5]} // RGBA
                        // scale={imageProps.scale}
                        // rotate={imageProps.rotateScale}
                    />
                    </Grid>
                    <Grid container item direction="row" justify="space-between">
                        <Grid item xs={4}>
                            Zoom:
                        </Grid>
                        <Grid item xs={8}>
                            <input
                            style={{width: "100%"}}
                            name="scale"
                            type="range"
                            // onChange={handleScale}
                            min='1'
                            max="2"
                            step="0.01"
                            defaultValue="1"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" justify="space-between">
                        <Grid item xs={4}>
                            Rotation:
                        </Grid>
                        <Grid item xs={8}>
                            <input
                            style={{width: "100%"}}
                            name="scale"
                            type="range"
                            // onChange={rotateScale}
                            min="0"
                            max="180"
                            step="1"
                            defaultValue="0"
                            />
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Button 
                        // onClick={handleSave} 
                        variant="outlined" 
                        color="primary"
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Paper> 
        </Dialog>
        <Grid item container justify="center" direction="column">
            <Grid item container justify="center">
                <Grid item container justify="center" xs={4} direction="column" >
                    <Grid item container justify="center">
                        <Badge  badgeContent={
                                <div style={chipStyles} 
                                // {...getRootProps()}
                                 > 
                                    {/* <input {...getInputProps()}  /> */}
                                    <EditIcon /> 
                                </div>} 
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                            {/* <Avatar alt={`${user.name} ${user.lastName}`} src={url} className={classes.large} /> */}
                        </Badge>
                    </Grid>
                    <Grid item container justify="center">
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {/* {`${user.name} ${user.lastName}`} */}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container justify="center" xs={7}>
                    <Grid item sm={3}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {/* {user.email} */} email
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {/* <strong>DNI:</strong> {user.dni} */} 
                                dni
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {/* <strong>Bithdate:</strong> {user.birthDate} */} fecha de nacimiento
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {/* <strong>Country:</strong> {user.country} */} pais
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {/* <strong>Address:</strong> {user.address} */} direccion
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {/* <strong>Phone Number:</strong> {user.phone} */} telefono
                            </Typography>
                            </CardContent>
                            <CardActions className={classes.button}>
                                {/* <EditModal user={user} initialUser={initialUser} /> */}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container justify="space-around" direction="row" sm={12} style={{marginTop: "2%"}}>
                <Grid item sm={10}>
                    <ListOrders />
                </Grid>
            </Grid>

        </Grid>
        </>
    )
}
