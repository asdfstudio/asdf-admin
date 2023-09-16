import { useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import Image from "next/image";
import Tag from "../Tag";
import FormattedDate from "src/components/FormattedDate";
import { deleteBlogById, deletePortfolioById, updateBlog } from "src/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BASE_IMAGE_URL } from "urlConfig";
import PopupAlert from "../PopupAlert";
import CoverImageUpload from "../CoverImageUpload";
import Input from "../Input";
import { IoEyeOutline } from "react-icons/io5";
import dynamic from 'next/dynamic';


// import { Editor as DraftEditor } from 'react-draft-wysiwyg';
const DraftEditor = dynamic(
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    {
      ssr: false,
    }
  );
import { Editor, EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const baseImageURL = BASE_IMAGE_URL;

const BlogCard = ({
    heading = '',
    subHeading = '',
    rightItem = () => {},
    children,
    topRight= "true",
    footerLeft = null,
    footerRight = "true",
    width=null,
    data=[],
    isAnyModalOpen
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [anyModal, setAnyModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

    //edit
    const [editConfirmModal, setEditConfirmModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [titleEdit, settitleEdit] = useState(data.title);
    const [descEdit, setdescEdit] = useState(data.desc);
    const [coverImageEdit, setcoverImageEdit] = useState();

    //rich text
    const parsedContent = JSON.parse(data.long_desc);
    const contentState = convertFromRaw(parsedContent);
    const editorState = EditorState.createWithContent(contentState);

    const [editorStateEdit, setEditorStateEdit] = useState(EditorState.createWithContent(contentState));
    const handleEditorChange = (state) => {
        setEditorStateEdit(state);
    };

    const handleCloseAfterSubmit = () => {
        handleCloseEditModal(false);
        settitleEdit(data.title);
        setdescEdit(data.desc);
        setcoverImageEdit([]);
    };

    const ConfrimHeading = "Are you sure you want to delete, ";

    const handleAnyModalClose = () => {
        setAnyModal(true);
        isAnyModalOpen(anyModal);
      };
      const handleAnyModalOpen = () => {
        setAnyModal(false);
        isAnyModalOpen(anyModal);
      };
    const handleCloseViewModal = () => {
      setViewModal(false);
      handleAnyModalClose()
    };
    
    const openViewModal = () => {
      setViewModal(true);
      handleAnyModalOpen()
    };

    const handleCloseDeleteModal = () => {
        setDeleteConfirmModal(false);
        handleAnyModalClose()
      };
    const handleDeletePortfolio = async () => {
        const payload = {
            blogId: data.id,
        };
        await dispatch(deleteBlogById(payload)).then(() => handleCloseViewModal());
      };
      
    const openDeleteConfirmModal = () => {
        setDeleteConfirmModal(true);
        handleAnyModalOpen()
    };

    // edit

    const handleCloseEditModal = () => {
        setEditConfirmModal(false);
        handleAnyModalClose()
      };
    const openEditConfirmModal = () => {
        setEditConfirmModal(true);
        handleAnyModalOpen()
      };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleFileUpload = (uploadedFiles) => {
        const updatedCoverImage = uploadedFiles.map((file) => file.file);
  
        setcoverImageEdit(...updatedCoverImage);
      };
    


    const handleEditPortfolio = (e) => {

        if(!titleEdit || !descEdit){
          switch (true) {
            case !titleEdit:
              setSubmitError("Title cannot be empty...");
              break;
            case !descEdit:
              setSubmitError("Description is empty...");
              break;
            default:
              setSubmitError("Fill the from properly");
              break;
          }
  
          handleShowAlert();
  
        } else {
          e.preventDefault();
          const long_desc = JSON.stringify(convertToRaw(editorStateEdit.getCurrentContent()));
          const form = new FormData();
          form.append("blogId", data.id);
          form.append("title", titleEdit);
          form.append("desc", descEdit);
          form.append("long_desc", long_desc);
          form.append('coverImageUpdate', coverImageEdit);

          dispatch(updateBlog(form)).then(() => handleCloseAfterSubmit());
        }
      };

    return (
        <>
            <div className={styles["card"]}>
                <div className="card-right">
                    <div className={styles["card-right-collection"]}>
                        <div>
                            {
                                topRight == "true" &&
                                <ActionButton
                                    inverse={true}
                                    label="View"
                                    style={{ padding: "4px 10px", fontSize: 14 }}
                                    onClick={openViewModal}
                                /> 
                            }
                        </div>
                        <div className={styles["viewsContainer"]}>
                          <IoEyeOutline />
                          <p className="ml-5">
                            Views: {data?.views}
                          </p>
                        </div>
                    </div>
                </div>
                <div className={styles["card-header"]}>
                    <div className={styles["card-left"]}>
                        <h2 className="s-16">{heading}</h2>
                        <p className="s-12 tc-grey">{subHeading}</p>
                    </div>
                </div>
                <div className={styles["card-body"]}>
                    {children}
                </div>
                {(footerLeft || footerRight) && (
                    <div className={styles["card-footer"]}>
                        {footerLeft && footerLeft()}
                        {/* {footerRight && footerRight()} */}
                        {
                            footerRight == "true" && 
                            <div style={{display:'flex', gap:'10px'}}>
                                <ActionButton
                                    inverse={true}
                                    label="Edit"
                                    style={{ padding: "4px 10px", fontSize: 14 }}
                                    onClick={openEditConfirmModal}
                                />
                                <ActionButton
                                    inverse={false}
                                    label="Delete"
                                    style={{ padding: "4px 10px", fontSize: 14 }}
                                    onClick={openDeleteConfirmModal}
                                />
                            </div>
                        }
                    </div>
                )}
            </div>

            <Modal
                isOpen={viewModal}
                heading={heading}
                onClose={handleCloseViewModal}
                // onDelete={handleDeletePortfolio}
                // onSubmit={handleEditPortfolio}
                // positiveText={'Edit'}
                // negativeText={'Cancel'}
                // negativeText2={'Delete'}
            >
                {data &&
                    <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"0px" }}>
                        <FormattedDate mysqlDateTimeString={data?.upload_time} />
                        <p>Total views: {data?.views}</p>

                        <div className={styles["imageContainer"]}>
                            <Image 
                            // src={`/`+data.coverImage}
                            src={`${baseImageURL}${data.coverImage}`}
                            alt={data.coverImage}
                            width={300}
                            height={250}
                            sizes="50vw"
                            style={{ borderRadius: 10, objectFit: "cover"}}
                            priority
                            />
                         </div>
                        <div style={{maxWidth: '800px'}}>
                            <Editor
                                editorState={editorState}
                                readOnly={true} // Set the editor to read-only mode
                            />
                        </div>
                    </div>
                }
            </Modal>

            <Modal
                isOpen={deleteConfirmModal}
                heading={ConfrimHeading + heading + "?"}
                onClose={handleCloseDeleteModal}
                positiveText={'Yes'}
                negativeText2={'Cancel'}
                onDelete={handleCloseDeleteModal}
                onSubmit={handleDeletePortfolio}
            >
            </Modal>

            <Modal
                isOpen={editConfirmModal}
                onClose={handleCloseEditModal}
                heading={"Edit Blog"}
                positiveText={"Update"}
                onSubmit={handleEditPortfolio}
            >
                <div>
                    <Input
                        inputContainerStyle={{ padding: "15px 30px" }}
                        type="text"
                        placeholder="Title"
                        onChange={(e) => settitleEdit(e.target.value)}
                        name="title"
                        label={"Title of the blog"}
                        value={titleEdit}
                    />
                    <Input
                        inputContainerStyle={{ padding: "15px 30px" }}
                        type="text"
                        placeholder="Description"
                        onChange={(e) => setdescEdit(e.target.value)}
                        name="desc"
                        label={"Description"}
                        value={descEdit}
                    />

                    <div style={{padding: "20px 30px"}}>
                        <DraftEditor editorState={editorStateEdit} onEditorStateChange={handleEditorChange} />
                    </div>

                    <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                        <p>Select cover photo (Select One)</p>
                        <CoverImageUpload
                            maxImage="1"
                            onUpload={handleFileUpload}
                            // file={coverImage}
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

export default BlogCard;