import React, { memo, useState } from 'react'

import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { BASE_IMAGE_URL } from 'urlConfig'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)  

const CoverImageUpload = ({
    maxImage = "",
    onUpload,
    file
}) => {
    const handleUpdateFile = (files) => {
        onUpload(files);
    };

    const fullImagePath = `${BASE_IMAGE_URL}${file}`

    return (
        <div>
            <FilePond
                files={file? fullImagePath : null}
                onupdatefiles={handleUpdateFile}
                maxFiles={maxImage}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}
export default memo(CoverImageUpload);