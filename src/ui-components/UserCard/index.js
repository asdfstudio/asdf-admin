import { useEffect, useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import { deleteUserById, promoteUser } from "src/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BASE_IMAGE_URL } from "urlConfig";
import PopupAlert from "../PopupAlert";
import Input from "../Input";
import { TbSettings2 } from "react-icons/tb";

import React from 'react'
import Select from 'react-select'
import { useSelector } from "react-redux";

const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'superAdmin', label: 'Super Admin' }
  ]

const defaultRole = roleOptions[0]; 

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
    const authRole = useSelector(state => state.auth.user.role);

    //edit
    const [editConfirmModal, setEditConfirmModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [userRole, setuserRole] = useState(data.role);
    const [selectedOption, setSelectedOption] = useState(defaultRole);

    const userError = useSelector(state => state.user?.error);

    const [isUserError, setUserError] = useState('');

    useEffect(() => {
        if (userError) {
            setUserError(userError);
        }
      }, [userError]);

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
            userId: data.id,
        };
        await dispatch(deleteUserById(payload)).then(() => handleCloseViewModal());
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
    
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };


    const handleEditPortfolio = (e) => {
          e.preventDefault();
          const payload = {
            userId: data.id,
            newRole: selectedOption.value
        };
          dispatch(promoteUser(payload)).then(() => handleCloseAfterSubmit());
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
                                    <TbSettings2 />
                                    <p className="ml-5">
                                        <span style={{textTransform:'capitalize'}}>{userRole}</span>
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
                                {
                                (authRole === 'superAdmin' || data.role === 'user') && (
                                    <ActionButton
                                        inverse={false}
                                        label="Delete"
                                        style={{ padding: "4px 10px", fontSize: 14 }}
                                        onClick={openDeleteConfirmModal}
                                    />
                                )
                                }
{
                                (authRole === 'superAdmin' || data.role === 'user') && (
                                    <ActionButton
                                        inverse={true}
                                        label="Promote"
                                        style={{ padding: "4px 10px", fontSize: 14 }}
                                        onClick={openEditConfirmModal}
                                    />
                                )
                                }
                            </div>
                        }
                    </div>
                )}
            </div>

            {isUserError && (
                <PopupAlert
                message={isUserError}
                // onClose={handleCloseAlert}
                color="red"
                />
            )}

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
                heading={"Select Role"}
                positiveText={"Cofirm"}
                onSubmit={handleEditPortfolio}
            >
                <div>
                    <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                        <Select
                            defaultValue={defaultRole}
                            options={roleOptions}
                            onChange={handleSelectChange}
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

export default UserCard;