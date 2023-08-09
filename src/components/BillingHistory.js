import ActionButton from "@aio/components/ActionButton";
import Table from "@aio/components/Table";
import {
  FaCloudDownloadAlt,
  FaRegFilePdf,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "@aio/components/Modal";

const table_column_heading = [
  {
    key: "project",
    heading: "Project",
  },
  {
    key: "project-date",
    heading: "Project date",
    icon: FaLongArrowAltDown,
  },
  {
    key: "tag",
    heading: "Tag",
  },
  {
    key: "plan",
    heading: "Plan",
  },
  {
    key: "cover-image",
    heading: "Cover Image",
  },
  {
    key: "action-btn",
    heading: "",
  },
];

const table_data = [
  {
    id: 1,
    project: {
      value: "project #007 - Dec 2022",
      icon: FaRegFilePdf,
    },
    "project-date": {
      value: "Dec 1, 2022",
    },
    tag: {
      value: "Rs. 4000",
    },
    plan: {
      value: "Basic Plan",
    },
    "cover-image": {
      value: "10 cover-image",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="View"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => {
            alert('Welcome to airlyStudio dashboard presentation');
          }}
        />
      ),
    },
  },
  {
    id: 2,
    project: {
      value: "project #007 - Dec 2022",
      icon: FaRegFilePdf,
    },
    "project-date": {
      value: "Dec 1, 2022",
    },
    tag: {
      value: "Rs. 4000",
    },
    plan: {
      value: "Basic Plan",
    },
    "cover-image": {
      value: "10 cover-image",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="View"
          Icon={FaCloudDownloadAlt}
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
        mainHeading={"project List"}
        subHeading={"All all the project listed down"}
        headingRightItem={() => (
          <ActionButton
            onClick={openModal}
            label="View All"
            Icon={FaCloudDownloadAlt}
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
