import ActionButton from "@aio/components/ActionButton";
import Table from "@aio/components/Table";
import {
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "@aio/components/Modal";
import { BsEye } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import Tag from "@aio/components/Tag";

const table_column_heading = [
  {
    key: "cover-image",
    heading: "Cover Image",
  },
  {
    key: "project",
    heading: "Project",
  },
  {
    key: "project-date",
    heading: "Project date",
    icon: BiCalendar,
  },
  {
    key: "tag",
    heading: "Tag",
  },
  {
    key: "action-btn",
    heading: "",
  },
];

const table_data = [
  {
    id: 1,
    "cover-image": {
      image: "cover01.png"
    },
    project: {
      value: "CheckCheck",
    },
    "project-date": {
      value: "Dec 1, 2022",
    },
    tag: {
      component: () => (
        <Tag
          label="Website Application"
          inverse={true}
        />
      ),
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="View"
          Icon={BsEye}
          inverse={true}
          onClick={() => setModal(true)}
        />
      ),
    },
  },
  {
    id: 2,
    "cover-image": {
      image: "cover02.png"
    },
    project: {
      value: "Hello Skincare",
    },
    "project-date": {
      value: "Dec 1, 2022",
    },
    tag: {
      component: () => (
        <Tag
          label="Website"
          inverse={true}
        />
      ),
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="View"
          Icon={BsEye}
          inverse={true}
        />
      ),
    },
  },
];

const projectHistory = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <Table
        mainHeading={"Project List"}
        subHeading={"All the project listed down"}
        headingRightItem={() => (
          <ActionButton
            onClick={openModal}
            label="Sort"
            Icon={FaLongArrowAltDown}
          />
        )}
        heading={table_column_heading}
        data={table_data}
      />
      <Modal
        isOpen={modal}
        heading={"Download all project"}
        onClose={handleClose}
        positiveText={'Download'}
        negativeText={'Cancel'}
      />
    </>
  );
};

export default projectHistory;
