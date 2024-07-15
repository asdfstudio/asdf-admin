import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from "@aio/components/ActionButton";
import HeaderSection from "@aio/components/HeaderSection";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "@aio/components/Modal";
import Input from "@aio/components/Input";
import { addBlog } from 'src/actions';
import Spinner from '@aio/components/Spinner';
import PopupAlert from '@aio/components/PopupAlert';
import CoverImageUpload from '@aio/components/CoverImageUpload';
import BlogHistory from 'src/components/BlogHistory';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
);
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Blog = () => {
  const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const blogs = useSelector(state => state.blog);
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverImage, setCoverImage] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Rich Text
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleEditorChange = (state) => {
      setEditorState(state);
    };

    const handleClose = () => {
      setModal(false);
      setTitle(title);
      setDesc(desc);
      setCoverImage([]);
    };

    const handleCloseAfterSubmit = () => {
      setModal(false);
      setTitle('');
      setDesc('');
      setEditorState('');
      setCoverImage([]);
    };

    const handleFileUpload = useCallback((uploadedFiles) => {
      const updatedCoverImage = uploadedFiles.map((file) => file.file);

      setCoverImage(...updatedCoverImage);
    }, []);

    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    const handleSubmit = (e) => {

      if(!title || !desc || !editorState || coverImage.length == 0){
        switch (true) {
          case !title:
            setSubmitError("Title cannot be empty...");
            break;
          case !desc:
            setSubmitError("Description is empty...");
            break;
          case !editorState:
            setSubmitError("Long Description is empty...");
            break;
          case coverImage.length == 0:
            setSubmitError("You must need to add a cover image...");
            break;
          default:
            setSubmitError("Fill the from properly");
            break;
        }

        handleShowAlert();

      } else {
        e.preventDefault();
        const long_desc = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const form = new FormData();
        form.append("userId", auth.user.id);
        form.append("title", title);
        form.append("desc", desc);
        form.append("long_desc", long_desc);
        form.append('coverImage', coverImage);
        
        dispatch(addBlog(form)).then(() => handleCloseAfterSubmit());
      }
    };
    return (
      blogs.loading ? 
        <Spinner/> : 
        blogs.loading ? <Spinner /> : 
        <>
        <HeaderSection
            heading={"Blog"}
            subHeading={"App new blog"}
            rightItem={() => (
              <ActionButton
                  onClick={() => setModal(true)}
                  Icon={AiOutlinePlusCircle}
                  label="Blog"
              />
            )}
        />
        <BlogHistory
          // data={table_data_api} 
          data={blogs.blogs} 
        />

        <Modal
            isOpen={modal}
            onClose={handleClose}
            heading={"Create New Blog"}
            positiveText={"Save Changes"}
            onSubmit={handleSubmit}
        >
          <div>
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              label={"Title of the blog"}
              value={title}
            />
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
              label={"Description"}
              value={desc}
            />

            <div style={{padding: "20px 30px"}}>
              <Editor editorState={editorState} onEditorStateChange={handleEditorChange} />
            </div>

            <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
              <p>Select cover photo (Select One)</p>
              <CoverImageUpload
                maxImage="1"
                onUpload={handleFileUpload}
              />
            </div>

            {
                showAlert && (
                  <PopupAlert
                    message={submitError}
                    onClose={handleCloseAlert}
                    color="red"
                  />
                )
              }
          </div>
        </Modal>
      </>
    );
}

export default Blog;