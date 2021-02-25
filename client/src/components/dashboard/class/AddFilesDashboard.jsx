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
    
const AddFilesDashboard = () => {
    let files = [];
    const lectureId = useSelector(state => state.lectureReducer.temporalId);
    console.log(lectureId)

    const uppy = useMemo((id = lectureId) => {
        return Uppy({
          debug: true,
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
                  snapshot => {},
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
                              .catch(err => console.log(err)));
                          });
                  }
              )
              })
            }) 
            Promise.all(promises).then(() => {
              uppy.reset()
            });
          })
      }, [lectureId])
      
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

