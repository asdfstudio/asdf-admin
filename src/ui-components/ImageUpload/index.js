import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from "./input.module.css";

import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)  

const ImageUpload = ({
    maxImage = "",
    onUpload 
}) => {
    const handleUpdateFiles = (files) => {
        onUpload(files);
    };
    const [files, setFiles] = useState([])
    return (
        <div>
            <FilePond
                // files={files}
                onupdatefiles={handleUpdateFiles}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={maxImage}
                // onupdatefiles={handleUpdateFiles}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}
export default ImageUpload;