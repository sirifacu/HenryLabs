import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Spanish from '@uppy/locales/lib/es_ES'
import DragDrop from '@uppy/drag-drop'
import FileInput from '@uppy/file-input'
import Url from '@uppy/url'
import "@uppy/core/dist/style.css";
import '@uppy/drag-drop/dist/style.css'
import "@uppy/dashboard/dist/style.css";
import '@uppy/file-input/dist/style.css';
import '@uppy/url/dist/style.css';
import firebase from '../../../firebase/index'
import { storage } from '../../../firebase/index'
import axios from 'axios'

const {REACT_APP_SERVER_HOST } = process.env;
    
const AddFilesDashboard = (props) => {
    const {setFiles, filesLength} = props
    let files = [];
    const lectureId = useSelector(state => state.lectureReducer.temporalId);

    const uppy = useMemo(() => {
        return Uppy({
          debug: true,
          locale: Spanish
        })

          .use(Url, {id: 'Url', companionUrl: REACT_APP_SERVER_HOST })
           .on('file-added', (file) => {
            files.push(file);
            setFiles(filesLength.filesLength + 1)
          }) 
          .on('file-removed', (file) => {
            files = files.filter(({name}) => name != file.name)
            setFiles(filesLength.filesLength - 1)
          })
          .on('upload', () => {
             const promises = files.map(file => {
              return new Promise((resolve, reject) => {
                const fileUploaded = firebase.storage().ref(`cohorte/lecture/${file.name}`).put(file.data);
                fileUploaded.on (
                  "state_changed",
                  snapshot => {},
                  error => {reject(error)},
                  async () => {
                      await storage
                          .ref(`/cohorte/lecture`)
                          .child(file.name)
                          .getDownloadURL()
                          .then(url => {
                              const fileName = file.name.split('.')[0];
                              const fileExtension = file.name.split('.')[1];
                              console.log(lectureId)
                              resolve(axios.post(`/files/add/${lectureId}`, {name: fileName, url, extension: fileExtension})
                              .catch(err => console.log(err)));
                          });
                  }
              )
              })
            }) 
            Promise.all(promises).then(() => {
              setFiles(0)
              uppy.reset()
            });
          })
      }, [])
      
      useEffect(() => {
        return () => uppy.close()
      }, [])
    
      return (
        <Dashboard
          theme = {'light'}
          width = {"750"}
          showProgressDetails = {true}
          height = {350}
          uppy={uppy}
          plugins={['Url']}
          /* {...props} */
        />
      )
}

export default AddFilesDashboard

