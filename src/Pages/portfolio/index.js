import { useState } from "react";
import ActionButton from "@aio/components/ActionButton";
import BillingHistory from "../../components/BillingHistory";
import HeaderSection from "@aio/components/HeaderSection";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "@aio/components/Modal";
import Input from "@aio/components/Input";
import { portfolioTags } from "src/data";


const Portfolio = () => {
    const [modal, setModal] = useState(false);

    const handleClose = () => {
      //alert('closing');
      setModal(false);
    };
  
    const handleCancel = () => {
      setModal(false);
    }
  
    const handleSubmit = () => {
      alert('Submit is working..!');
      handleClose();
    }
    return (
        <>
            <HeaderSection
                heading={"Portolio"}
                subHeading={"App new portfolio"}
                rightItem={() => (
                    <ActionButton
                        onClick={() => setModal(true)}
                        Icon={AiOutlinePlusCircle}
                        label="Portfilio"
                    />
                )}
            />
            <BillingHistory />

            <Modal
                isOpen={modal}
                onClose={handleClose}
                heading={"Create New Portfolio"}
                positiveText={"Save Changes"}
                // negativeText={"Cancel"}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            >
                            <div>
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="text"
                placeholder="Title"
                onChange={(e) => console.log(e)}
                name="title"
                label={"Title of the portfolio"}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Description"
                onChange={(e) => console.log(e)}
                name="desc"
                label={"Description"}
              />

                {/* {portfolioTags.map((tag, index) => (
                  <Input
                  inputContainerStyle={{ }}
                  type="checkbox"
                  placeholder=""
                  onChange={(e) => console.log(e)}
                  name="tag"
                  label={tag.text}
                />
                ))} */}


            </div>
            </Modal>
        </>
    );
}

export default Portfolio;