import React, { memo, useRef, useState } from 'react'

import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import ActionButton from '../ActionButton'
import { BASE_IMAGE_URL } from 'urlConfig'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)  

const ImageUpload = ({
    maxImage = "",
    onUpload,
    images
}) => {
    const pondRef = useRef(null);

    const handleUpdateFiles = (files) => {
        onUpload(files);
    };

    const fullImagePaths = images?.map((image)=>`${BASE_IMAGE_URL}${image.image}`)

    const handleSaveChanges = () => {
        const currentOrder = pondRef.current.getFiles();
        // const reorderedImages = currentOrder.map((file) => file.file);
        onUpload(currentOrder);
      };


    return (
        <div>
            <FilePond
                ref={pondRef}
                files={images? fullImagePaths : null}
                onupdatefiles={handleUpdateFiles}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={maxImage}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
             <ActionButton
                inverse={true}
                label="Save sorting"
                style={{ padding: "8px 10px", fontSize: 14, float:"right", margin: "10px 20px" }}
                onClick={handleSaveChanges}
            />
        </div>
    );
}
export default memo(ImageUpload);