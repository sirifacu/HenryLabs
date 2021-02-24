import React, { useMemo, useEffect } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Spanish from '@uppy/locales/lib/es_ES'
import DragDrop from '@uppy/drag-drop'
import FileInput from '@uppy/file-input'
import Url from '@uppy/url'
import AwsS3 from '@uppy/aws-s3'
import Webcam from '@uppy/webcam'
import "@uppy/core/dist/style.css";
import '@uppy/drag-drop/dist/style.css'
import "@uppy/dashboard/dist/style.css";
import '@uppy/file-input/dist/style.css'
import '@uppy/url/dist/style.css'

const {REACT_APP_SERVER_HOST } = process.env;

const AddFilesDashboard = () => {
    const uppy = useMemo(() => {
        return Uppy({
          debug: true,
          locale: Spanish
        })
          .use(FileInput,{id: 'FileInput', companionUrl: REACT_APP_SERVER_HOST})
          .use(DragDrop,{id: 'DragDrop', companionUrl: REACT_APP_SERVER_HOST})
          .use(Url, {id: 'Url', companionUrl: REACT_APP_SERVER_HOST })
          .use(AwsS3, {companionUrl: 'http://localhost:3005'})
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

