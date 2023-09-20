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
import Spinner from '@aio/components/Spinner';
import PopupAlert from '@aio/components/PopupAlert';
import CoverImageUpload from '@aio/components/CoverImageUpload';


const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector(state => state.portfolio);
    const [modal, setModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverImage, setCoverImage] = useState([]);
    const [portfolio_tags, setPortfolio_tags] = useState([]);
    const [portfolio_images, setPortfolio_images] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertAfter, setShowAlertAfter] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const profileError = useSelector(state => state.portfolio?.error);

    useEffect(() => {
      getPortfolios();
    }, [portfolios, dispatch]);

    const handleClose = () => {
      setModal(false);
      setTitle(title);
      setDesc(desc);
      setCoverImage([]);
      // setPortfolio_tags([]);
    };

    const handleCloseAfterSubmit = () => {
      setModal(false);
      setTitle('');
      setDesc('');
      setCoverImage([]);
      setPortfolio_tags([]);
      setPortfolio_images([]);
    };

    const handleFileUpload = (uploadedFiles) => {
      const updatedCoverImage = uploadedFiles.map((file) => file.file);

      setCoverImage(...updatedCoverImage);
    };
    
    const handleFilesUpload = (uploadedFiles) => {
      const updatedImages = uploadedFiles.map((file) => file.file);

      setPortfolio_images(updatedImages);
    };

    const handleSelectChange = (selectedOption) => {
      setPortfolio_tags(selectedOption);
    };
    const handleShowAlert = () => {
      setShowAlert(true);
    };

    const handleShowAlertAfter = () => {
      setShowAlertAfter(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };
    const handleCloseAlertAfter = () => {
      setShowAlertAfter(false);
    };

    const handleSubmit = (e) => {

      if(!title || !desc || portfolio_tags.length == 0 || coverImage.length == 0){
        switch (true) {
          case !title:
            setSubmitError("Title cannot be empty...");
            break;
          case !desc:
            setSubmitError("Description is empty...");
            break;
          case portfolio_tags.length == 0:
            setSubmitError("Please select any tag to continue...");
            break;
          case coverImage.length == 0:
            setSubmitError("You must add a cover image...");
            break;
          default:
            setSubmitError("Fill the from properly");
            break;
        }

        handleShowAlert(); 

      } else {
        e.preventDefault();
        const form = new FormData();
        form.append("name", title);
        form.append("desc", desc);
        form.append('coverImage', coverImage);
  
        const imagestag = {
          tags: portfolio_tags.map(tag => (tag.label ))
        };

        dispatch(addPortfolio(form, portfolio_images, portfolio_tags))
        .then(() => {
          handleCloseAfterSubmit();
        });

        {profileError && handleShowAlertAfter()}

      }
    };
    
    return (
      portfolios.loading ? 
        <Spinner/> : 
        portfolios.loading ? <Spinner /> : 
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

        {
          showAlertAfter && (
            <PopupAlert
              message={profileError}
              onClose={handleCloseAlertAfter}
              color="red"
            />
          )
        }

        <Modal
            isOpen={modal}
            onClose={handleClose}
            heading={"Create New Portfolio"}
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
                isSearchable 
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
              <CoverImageUpload
                maxImage="1"
                onUpload={handleFileUpload}
              />
            </div>

            <div style={{padding: "20px 30px", display: "flex", flexDirection:"column", gap:"10px"}}>
              <p>Select Portfolio photos</p>
              <ImageUpload
                maxImage="100"
                onUpload={handleFilesUpload}
                // files={portfolio_images}
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

export default Portfolio;