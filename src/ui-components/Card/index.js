import { useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import Image from "next/image";
import Tag from "../Tag";
import FormattedDate from "src/components/FormattedDate";
import { addPortfolio, deletePortfolioById } from "src/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BASE_IMAGE_URL } from "urlConfig";
import PopupAlert from "../PopupAlert";
import ImageUpload from "../ImageUpload";
import CoverImageUpload from "../CoverImageUpload";
import Select from 'react-select';
import Input from "../Input";
import { tags } from "src/components/tags";

const baseImageURL = BASE_IMAGE_URL;

const Card = ({
    heading = '',
    subHeading = '',
    rightItem = () => {},
    children,
    topRight= "true",
    footerLeft = null,
    footerRight = "true",
    width=null,
    data=[]
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [viewModal, setViewModal] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

    //edit
    const [editConfirmModal, setEditConfirmModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [titleEdit, settitleEdit] = useState(data.name);
    const [descEdit, setdescEdit] = useState(data.desc);
    const [coverImageEdit, setcoverImageEdit] = useState();
    const [portfolio_tagsEdit, setportfolio_tagsEdit] = useState([]);
    const [portfolio_imagesEdit, setportfolio_imagesEdit] = useState([]);

    const handleCloseAfterSubmit = () => {
        handleCloseEditModal(false);
        settitleEdit(data.name);
        setdescEdit(data.desc);
        setcoverImageEdit([]);
        setportfolio_tagsEdit([]);
        setportfolio_imagesEdit([]);
    };

    const initialSelectedTags = data.portfolio_tags?.map((tag) => ({
        value: tag.tag,
        label: tag.tag,
    }));
    
    const [selectedOption, setSelectedOption] = useState(initialSelectedTags);

    const filteredTags = tags.filter((tag) => !selectedOption.some((selected) => selected.label === tag.label));

    const ConfrimHeading = "Are you sure you want to delete, ";
    const handleCloseViewModal = () => {
      setViewModal(false);
    };
    
    const openViewModal = () => {
      setViewModal(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteConfirmModal(false);
      };
    const handleDeletePortfolio = async () => {
        const payload = {
            portfolioId: data.id,
        };
        await dispatch(deletePortfolioById(payload)).then(() => handleCloseViewModal());
        // router.reload();
        // dispatch(addPortfolio(form)).then(() => handleClose());
      };
      
    const openDeleteConfirmModal = () => {
        setDeleteConfirmModal(true);
    };

    // edit

    const handleCloseEditModal = () => {
        setEditConfirmModal(false);
      };
    const openEditConfirmModal = () => {
        setEditConfirmModal(true);
      };
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
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
      
      const handleFilesUpload = (uploadedFiles) => {
        const updatedImages = uploadedFiles.map((file) => file.file);
  
        setportfolio_imagesEdit(updatedImages);
      };


    const handleEditPortfolio = (e) => {

        if(!titleEdit || !descEdit || initialSelectedTags.length == 0){
          switch (true) {
            case !titleEdit:
              setSubmitError("Title cannot be empty...");
              break;
            case !descEdit:
              setSubmitError("Description is empty...");
              break;
            case initialSelectedTags.length == 0:
              setSubmitError("Please select any tag to continue...");
              break;
            default:
              setSubmitError("Fill the from properly");
              break;
          }
  
          handleShowAlert();
  
        } else {
          e.preventDefault();
          const form = new FormData();
          form.append("name", titleEdit);
          form.append("desc", descEdit);
          form.append('coverImage', coverImageEdit);
    
          const imagestag = {
            tags: selectedOption.map(tag => (tag.label))
          };
          
            dispatch(addPortfolio(form, portfolio_imagesEdit, imagestag.tags)).then(() => handleCloseAfterSubmit());
        }
      };

    return (
        <>
            <div className={styles["card"]}>
                <div className={styles["card-header"]}>
                    <div className={styles["card-left"]}>
                        <h2 className="s-16">{heading}</h2>
                        <p className="s-12 tc-grey">{subHeading}</p>
                    </div>
                    <div className="card-right">
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
                        <FormattedDate mysqlDateTimeString={data?.createdAt} />
                        <p>{data?.desc}</p>
                        <div className={styles["tagContainer"]}>
                            {
                                data.portfolio_tags?.map((tag, i) => (
                                    <div className={styles["tagAllign"]} key={i}>
                                        <Tag
                                            label={tag.tag}
                                            inverse={true}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        {
                            data.portfolio_pictures?.length == 0 ? <p>No images here... </p> 
                            : data.portfolio_pictures?.map((data, i) => (
                                <Image 
                                    // src={`/`+data.coverImage}
                                    key={data.id}
                                    src={`${baseImageURL}${data.image}`}
                                    alt={data.coverImage}
                                    width={0}
                                    height={0}
                                    sizes="80vw"
                                    style={{ width: '100%', height: 'auto', objectFit: "cover" }}
                                    priority
                                />
                        ))
                    }
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
                heading={"Edit Portfolio"}
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
                        label={"Title of the portfolio"}
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
                    <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                        <p>Tags</p>
                        <Select
                            defaultValue={selectedOption}
                            isMulti
                            isSearchable 
                            name="tags"
                            // options={options}
                            options={filteredTags}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelectChange}
                        />
                    </div>

                    <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                        <p>Select cover photo (Select One)</p>
                        <CoverImageUpload
                            maxImage="1"
                            onUpload={handleFileUpload}
                            // file={coverImage}
                        />
                    </div>

                    <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                        <p>Select Portfolio photos</p>
                        <ImageUpload
                            maxImage="100"
                            onUpload={handleFilesUpload}
                            // files={portfolio_imagesEdit}
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

export default Card;