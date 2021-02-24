import React, { useMemo, useEffect } from 'react'
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

const {REACT_APP_SERVER_HOST } = process.env;


/* handleOnChange (e) {
      const file = event.target.files[0]
      const storageRef = firebase.storage().ref(`cohorte${num}/lecture${num2}/${file.name}`)
      const task = storageRef.put(file)
  
      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          uploadValue: percentage
        })
      }, (error) => {
        console.error(error.message)
      }, () => {
        await storage
          .ref(`/products/images/${productName}/`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
              resolve(form.image.push(url));
          });
        // Upload complete
        this.setState({
          picture: task.snapshot.downloadURL
        })
      })
    } */

    
const AddFilesDashboard = () => {
    let files = [];

    const uppy = useMemo(() => {
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
                              resolve(console.log("URL: ",url));
                          });
                  }
              )
              })
            }) 
            Promise.all(promises).then(() => uppy.reset());
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

