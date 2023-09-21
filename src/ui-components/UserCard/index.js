import { useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import Image from "next/image";
import Tag from "../Tag";
import FormattedDate from "src/components/FormattedDate";
import { deleteUserById } from "src/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BASE_IMAGE_URL } from "urlConfig";
import PopupAlert from "../PopupAlert";
import Input from "../Input";
import { IoEyeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BiSolidUser } from "react-icons/bi";


const baseImageURL = BASE_IMAGE_URL;

const UserCard = ({
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

    const [userRole, setuserRole] = useState(data.title);

    const handleCloseAfterSubmit = () => {
        handleCloseEditModal(false);
        setuserRole(data.role);
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
        // await dispatch(deleteBlogById(payload)).then(() => handleCloseViewModal());
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
    


    const handleEditPortfolio = (e) => {
          e.preventDefault();
          const form = new FormData();
          form.append("userId", data.id);
          form.append("role", userRole);

        //   dispatch(promoteUser(form)).then(() => handleCloseAfterSubmit());
      };

    return (
        <>
            <div className={styles["card"]}>
                <div className="card-right">
                    <div className={styles["card-right-collection"]}>
                        <div>
                            {
                                topRight == "true" &&
                                <div className={styles["date-placeholder"]}>
                                    <BiSolidUser />
                                    <p className="ml-5">
                                        <span style={{textTransform:'capitalize'}}>{data.role}</span>
                                    </p>
                                </div>
                            }
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
                        {/* <FormattedDate mysqlDateTimeString={data?.upload_time} /> */}
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
                        placeholder="Role"
                        onChange={(e) => settitleEdit(e.target.value)}
                        name="role"
                        label={"Role of the user"}
                        value={userRole}
                    />
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

export default UserCard;