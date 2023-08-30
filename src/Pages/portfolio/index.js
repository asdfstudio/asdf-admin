import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import ActionButton from "@aio/components/ActionButton";
import ProjectHistory from "../../components/ProjectHistory";
import HeaderSection from "@aio/components/HeaderSection";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "@aio/components/Modal";
import Input from "@aio/components/Input";
import ImageUpload from '@aio/components/ImageUpload';
import { tags } from 'src/components/tags';
import { useDispatch } from 'react-redux';
import { addPortfolio, addPortfolioTags, getPortfolios } from 'src/actions';


const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector(state => state.portfolio);
    const [modal, setModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverImage, setCoverImage] = useState([]);
    const [portfolio_tags, setPortfolio_tags] = useState("");
    const [portfolio_images] = useState([]);

    useEffect(() => {
      getPortfolios();
      console.log("Relaoad")
    }, [portfolios]);

    const handleClose = () => {
      setModal(false);
    };
  
    const handleCancel = () => {
      setModal(false);
    }

    const handleFileUpload = (uploadedFiles) => {
      setCoverImage(uploadedFiles[0].file);
    };

    const handleFilesUpload = (uploadedFiles) => {
      uploadedFiles.forEach((files) => {
        if (!portfolio_images.includes(files.file)) {
          portfolio_images.push(files.file);
        }
      });
    };

    const handleSelectChange = (selectedOption) => {
      setPortfolio_tags(selectedOption);
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append("name", title);
      form.append("desc", desc);
      form.append('coverImage', coverImage);

      const imagestag = {
        tags: portfolio_tags.map(tag => (tag.label ))
      };
      
      dispatch(addPortfolio(form, portfolio_images, imagestag.tags)).then(() => handleClose());
    };
    
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
              // data={table_data_api} 
              data={portfolios.portfolios} 
            />

            <Modal
                isOpen={modal}
                onClose={handleClose}
                heading={"Create New Portfolio"}
                positiveText={"Save Changes"}
                onSubmit={handleSubmit}
            >
              <form onSubmit={handleSubmit}>
                <Input
                  inputContainerStyle={{ padding: "15px 30px" }}
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  label={"Title of the portfolio"}
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
                <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                  <p>Tags</p>
                  <Select
                    defaultValue={selectedOption}
                    isMulti
                    name="tags"
                    // options={options}
                    options={tags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                  />
                </div>

                <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                  <p>Select cover photo (Select One)</p>
                  <ImageUpload
                    maxImage="1"
                    onUpload={handleFileUpload}
                  />
                  {/* <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} /> */}
                </div>

                <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
                  <p>Select Portfolio photos</p>
                  <ImageUpload
                    maxImage="100"
                    onUpload={handleFilesUpload}
                  />
                </div>
              </form>
            </Modal>
        </>
    );
}

export default Portfolio;