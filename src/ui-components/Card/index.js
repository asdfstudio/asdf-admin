import { useState } from "react";
import styles from "./card.module.css";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import Image from "next/image";
import Tag from "../Tag";
import FormattedDate from "src/components/FormattedDate";
import { deletePortfolioById } from "src/actions";
import { useDispatch } from "react-redux";

const baseImageURL = "http://localhost:5000/api/portfolio/images/";

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
        const payload = {
            portfolioId: data.id,
        };
        dispatch(deletePortfolioById(payload)).then(() => handleCloseViewModal());
        // dispatch(addPortfolio(form)).then(() => handleClose());
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
                negativeText2={'Delete'}
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
                                src={`${baseImageURL}${data.image}`}
                                alt={data.coverImage}
                                width={0}
                                height={0}
                                sizes="80vw"
                                // fill={true}
                                style={{ width: '100%', height: 'auto' }}

                                // layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                            />
                        ))
                    }
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