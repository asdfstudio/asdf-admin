import React, { useState } from 'react';
import Select from 'react-select';
import ActionButton from "@aio/components/ActionButton";
import ProjectHistory from "../../components/ProjectHistory";
import HeaderSection from "@aio/components/HeaderSection";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "@aio/components/Modal";
import Input from "@aio/components/Input";


const Portfolio = () => {
    const [modal, setModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClose = () => {
      setModal(false);
    };
  
    const handleCancel = () => {
      setModal(false);
    }
  
    const handleSubmit = () => {
      alert('Submit is working..!');
      handleClose();
    }

    const tags = [
      {
        id: 1,
        tag: 'Website'
      },
      {
        id: 2,
        tag: 'Website Application'
      },
      {
        id: 3,
        tag: 'Application'
      },
      {
        id: 4,
        tag: 'Website'
      },
    ];

    const table_data_api = [
      {
        id: 1,
        coverImage: "cover01.png",
        project: "CheckCheck",
        projectDate: "Dec 1, 2022",
        desc:"The Strategic Design Studio works with companies to design and implement strategic.",
        tags: [
          { id: 1, tag: 'Website' },
          { id: 2, tag: 'Website Application' },
        ],
        actionBtn: "View"
      },
      {
        id: 2,
        coverImage: "cover02.png",
        project: "Hello Skincare",
        desc: "The Strategic Design Studio works with companies to design and implement strategic.",
        projectDate: "Nov 10, 2022",
        tags: [
          { id: 1, tag: 'Website' },
          { id: 2, tag: 'Website Application' },
          { id: 3, tag: 'Application' },
          { id: 4, tag: 'Website' },
        ],
        actionBtn: "View"
      },
      {
        id: 3,
        coverImage: "cover02.png",
        project: "Hello Skincare",
        desc: "The Strategic Design Studio works with companies to design and implement strategic.",
        projectDate: "Nov 10, 2022",
        tags: [
          { id: 1, tag: 'Website' },
          { id: 2, tag: 'Website Application' },
          { id: 3, tag: 'Application' },
          { id: 4, tag: 'Website' },
        ],
        actionBtn: "View"
      },
      {
        id: 4 ,
        coverImage: "cover02.png",
        project: "Hello Skincare",
        desc: "The Strategic Design Studio works with companies to design and implement strategic.",
        projectDate: "Nov 10, 2022",
        tags: [
          { id: 1, tag: 'Website' },
          { id: 2, tag: 'Website Application' },
          { id: 3, tag: 'Application' },
          { id: 4, tag: 'Website' },
        ],
        actionBtn: "View"
      },
    ];
    
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];    
    
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
            <ProjectHistory
              data={table_data_api} 
            />

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
                <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                  <p>Tags</p>
                  <Select
                    defaultValue={selectedOption}
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>


              </div>
            </Modal>
        </>
    );
}

export default Portfolio;