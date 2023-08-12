import { useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import Image from "next/image";
import Tag from "../Tag";

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
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const handleCloseViewModal = () => {
      setViewModal(false);
    };
    
    const openViewModal = () => {
      setViewModal(true);
    };

    const handleCloseEditModal = () => {
        setEditModal(false);
      };
    const handleDeletePortfolio = () => {
        alert('Deleting is working..!');
      };
    const handleEditPortfolio = () => {
        alert('Submit is working..!');
      };
      
      const openEditModal = () => {
        setEditModal(true);
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
                            <ActionButton
                                inverse={true}
                                label="Edit"
                                style={{ padding: "4px 10px", fontSize: 14 }}
                                onClick={openEditModal}
                            />
                        }
                    </div>
                )}
            </div>

            <Modal
                isOpen={viewModal}
                heading={heading}
                onClose={handleCloseViewModal}
                onDelete={handleDeletePortfolio}
                onSubmit={handleEditPortfolio}
                positiveText={'Edit'}
                // negativeText={'Cancel'}
            >
                {data &&
                    <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
                        <p>{data?.projectDate}</p>
                        <p>{data?.desc}</p>
                        <div className={styles["tagContainer"]}>
                            {
                                data.tags?.map((tag, i) => (
                                    <div className={styles["tagAllign"]} key={i}>
                                        <Tag
                                            label={tag.tag}
                                            inverse={true}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <Image 
                            src={`/`+data?.coverImage}
                            alt={data?.coverImage}
                            width={'580'}
                            height={'360'}
                        />
                        <Image 
                            src={`/`+data?.coverImage}
                            alt={data?.coverImage}
                            width={'580'}
                            height={'360'}
                        />
                        <Image 
                            src={`/`+data?.coverImage}
                            alt={data?.coverImage}
                            width={'580'}
                            height={'360'}
                        />
                    </div>
                }
            </Modal>

            <Modal
                isOpen={editModal}
                heading={heading}
                onClose={handleCloseEditModal}
                positiveText={'Edit '}
                // negativeText={'Cancel'}
            >
                {data &&
                    <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
                        <p>{data?.projectDate}</p>
                        <p>{data?.desc}</p>
                    </div>
                }
            </Modal>
        </>
    );
}

export default Card;