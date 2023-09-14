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
import BlogCard from "@aio/components/BlogCard";

const baseImageURL = BASE_IMAGE_URL;

const BlogHistory  = ({
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
                  <BlogCard
                    heading={data.title}
                    data={data}
                    isAnyModalOpen={isAnyModalOpenHandle}
                    footerLeft={() => {
                      return (
                        <div className={styles["date-placeholder"]}>
                          <SlCalender />
                          <p className="ml-5">
                            <FormattedDate mysqlDateTimeString={data?.upload_time} />
                            {/* {data?.upload_time} */}
                          </p>
                        </div>
                      );
                    }}
                  >
                    <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
                      <p>{data.desc}</p>
                      <div className={styles["imageContainer"]}>
                        <Image 
                          // src={`/`+data.coverImage}
                          src={`${baseImageURL}${data.coverImage}`}
                          alt={data.coverImage}
                          width={400}
                          height={350}
                          sizes="100vw"
                          style={{ borderRadius: 10, objectFit: "cover"}}
                          priority
                        />
                      </div>
                    </div>
                  </BlogCard>
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

export default BlogHistory;
