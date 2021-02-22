import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState } from "react";
import {useDropzone} from 'react-dropzone';

export const Invite = () => {
    const [files, setFiles] = useState([]);

    const dropzone = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 100,
        padding: "10px",
        borderWidth: "2px",
        borderRadius: "2px",
        borderColor: "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out",
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        multiple:  true,
        onDrop: acceptedFiles => {
            setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)})
              )))
        }
      })

    return (
        <div>
            <Grid item>
                    <div style={dropzone} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drag your CSV file here</p>
                      ) : (
                        <p>Drag the CSV file here or click to upload</p>
                      )}
                    </div>
                    <Typography>Al hacer click se subira la planilla con los emails de los estudiantes a invitar</Typography>
                    <Button>Subir planilla</Button>
                  </Grid>
                  
        </div>
    )
}
