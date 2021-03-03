import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Spanish from '@uppy/locales/lib/es_ES'
import Url from '@uppy/url'
import "@uppy/core/dist/style.css";
import '@uppy/drag-drop/dist/style.css'
import "@uppy/dashboard/dist/style.css";
import '@uppy/file-input/dist/style.css';
import '@uppy/url/dist/style.css';
import firebase from '../../../firebase/index'
import { storage } from '../../../firebase/index'
import axios from 'axios';
import { consoleLog } from '../../../services/consoleLog'
import LinearProgress from '@material-ui/core/LinearProgress';

const { REACT_APP_SERVER_HOST } = process.env;


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FFD21A",
  },
}))(LinearProgress);
    
const AddFilesDashboard = (props) => {
    let files = [];
    const {setOpenAlertUpload} = props
    const [progress, setProgress] = useState(0)
    const lectureId = useSelector(state => state.lectureReducer.temporalId);

    const uppy = useMemo((id = lectureId) => {
        return Uppy({
          debug: false,
          locale: Spanish
        })

          .use(Url, {id: 'Url', companionUrl: REACT_APP_SERVER_HOST })
           .on('file-added', (file) => {
            files.push(file);
          }) 
          .on('file-removed', (file) => {
            files = files.filter(({name}) => name != file.name)
          })
          .on('upload', () => {
             const promises = files.map(file => {
              return new Promise((resolve, reject) => {
                const fileUploaded = firebase.storage().ref(`lecture/${lectureId}/${file.name}`).put(file.data);
                fileUploaded.on (
                  "state_changed",
                  snapshot => {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  },
                  error => {reject(error)},
                  async () => {
                      await storage
                          .ref(`/lecture/${lectureId}`)
                          .child(file.name)
                          .getDownloadURL()
                          .then(url => {
                              const fileName = file.name.split('.')[0];
                              const fileExtension = file.name.split('.')[1];
                              resolve(axios.post(`/files/add/${id}`, {name: fileName, url, extension: fileExtension})
                              .catch(err => consoleLog(err)));
                          });
                  }
              )
              })
            }) 
            Promise.all(promises).then(() => {
              uppy.reset()
              setOpenAlertUpload(true)
              setProgress(0)
            });
          })
      }, [lectureId])
      
      useEffect(() => {
        return () => uppy.close()
      }, [])
   
      return (
        <>
        <Dashboard
          theme = {'light'}
          width = {"650"}
          showProgressDetails = {true}
          height = {350}
          uppy={uppy}
          plugins={['Url']}
        />
        <BorderLinearProgress variant="determinate" value={progress} />
        </>
      )
}

export default AddFilesDashboard

