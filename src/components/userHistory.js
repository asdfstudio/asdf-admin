import React, { useState } from "react";
import styles from "../components/style/component.module.css"
import { SlCalender } from "react-icons/sl";
import Image from "next/image";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormattedDate from "./FormattedDate";
import { BASE_IMAGE_URL } from "urlConfig";
import { updatedSortedPortfolio } from "src/actions";
import { useDispatch } from "react-redux";
import ActionButton from "@aio/components/ActionButton";
import UserCard from "@aio/components/UserCard";

const baseImageURL = BASE_IMAGE_URL;

const UserHistory  = ({
  data=[]
}) => {
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState(data);
  const [sortOccour, setSortOccour] = useState(false);
  const [anyModal, setAnyModal] = useState(false);

  function handleDrop(result) {

    if(!result.destination) return;

    const items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSortOccour(true);

    setItemList(items);
  };
  const updateSortingPortfolio = () => {
    dispatch(updatedSortedPortfolio(itemList));
  };
  const isAnyModalOpenHandle = (data) => {
    setAnyModal(data);
  };
  return (
    <div className={styles["row"]}>

      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className={styles["sortButton"]}>
                { sortOccour &&
                    <ActionButton
                      inverse={false}
                      label="Save sorting"
                      style={{ padding: "8px 10px", fontSize: 14, float:"right", margin: "10px 20px" }}
                      onClick={updateSortingPortfolio}
                    /> }
              </div>
              <div className={styles["column"]}>
              { itemList.map((data, i) => (
                <Draggable 
                  key={data.id} 
                  draggableId={data.id} 
                  index={i} 
                  // isDragDisabled={anyModal}
                  isDragDisabled={true}
                >
                {(provided) => (
                <div
                  key={i} 
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <UserCard
                    heading={data.name}
                    subHeading={data.role}
                    data={data}
                    isAnyModalOpen={isAnyModalOpenHandle}
                    footerLeft={() => {
                      return (
                        <div className={styles["date-placeholder"]}>
                          <SlCalender />
                          <p className="ml-5">
                            <FormattedDate mysqlDateTimeString={data?.registered} />
                          </p>
                        </div>
                      );
                    }}
                  >
                    <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
                      <p className={styles["descContainer"]}>{data.email}</p>
                    </div>
                  </UserCard>
                </div>
              )}
            </Draggable>
          ))}
          </div>
          {provided.placeholder}
          </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default UserHistory;
