import ActionButton from "@aio/components/ActionButton";
import Table from "@aio/components/Table";
import {
  FaImage,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "@aio/components/Modal";
import { BsEye } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import Tag from "@aio/components/Tag";
import { TbPencil, TbTags } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

const table_column_heading = [
  {
    key: "cover-image",
    heading: "Cover",
    icon: FaImage,
  },
  {
    key: "project",
    heading: "Project",
    icon: TbPencil,
  },
  {
    key: "project-date",
    heading: "Date",
    icon: BiCalendar,
  },
  {
    key: "tag",
    heading: "Tag",
    icon: TbTags,
  },
  {
    key: "action-btn",
    heading: "Action",
    icon: FiSettings,
  },
];

const table_data_api = [
  {
    id: 1,
    coverImage: "cover01.png",
    project: "CheckCheck",
    projectDate: "Dec 1, 2022",
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
    projectDate: "Dec 1, 2022",
    tags: [
      { id: 1, tag: 'Website' },
      { id: 2, tag: 'Website Application' },
      { id: 3, tag: 'Application' },
      { id: 4, tag: 'Website' },
    ],
    actionBtn: "View"
  },
];


const projectHistory = () => {
  const [viewModal, setViewModal] = useState(false);
  const handleCloseViewModal = () => {
    setViewModal(false);
  };
  
  const openViewModal = () => {
    setViewModal(true);
  };

  let table_dataa = (data) => {
    return (
      data.map((data, i) => (
        {
          id: data.id,
          "cover-image": {
            image: data.coverImage
          },
          project: {
            value: data.project,
          },
          "project-date": {
            value: data.projectDate,
          },
          tag: {
            component: () => (
              data.tags.map((tag, i) => (
                <div style={{padding: "5px"}} key={i}>
                  <Tag
                    label={tag.tag}
                    inverse={true}
                  />
                </div>
              ))
            ),
          },
          "action-btn": {
            component: () => (
              <>
              <ActionButton
                label={data.actionBtn}
                Icon={BsEye}
                inverse={true}
                onClick={openViewModal}
              />
              <Modal
                isOpen={viewModal}
                heading={data.project}
                onClose={handleCloseViewModal}
                positiveText={'Download'}
                negativeText={'Cancel'}
              >
                sfj
              </Modal>
              </>
            ),
          },
        }  
      ))
    );
  };

  return (
    <>
      <Table
        mainHeading={"Project List"}
        subHeading={"All the project listed down"}
        headingRightItem={() => (
          <ActionButton
            onClick={() => alert('closing')}
            label="Sort"
            Icon={FaLongArrowAltDown}
          />
        )}
        heading={table_column_heading}
        data={table_dataa(table_data_api)}
      />
    </>
  );
};

export default projectHistory;
