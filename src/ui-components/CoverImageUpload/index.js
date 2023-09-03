import React, { useState } from 'react'

import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)  

const CoverImageUpload = ({
    maxImage = "",
    onUpload,
    // files
}) => {
    const handleUpdateFile = (files) => {
        onUpload(files);
    };
    return (
        <div>
            <FilePond
                // files={files}
                onupdatefiles={handleUpdateFile}
                maxFiles={maxImage}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}
export default CoverImageUpload;