import React, { useState } from "react";
import Card from "@aio/components/Card";

import styles from "../components/style/component.module.css"
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import Tag from "@aio/components/Tag";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormattedDate from "./FormattedDate";

const baseImageURL = "http://localhost:5000/api/portfolio/images/";

const projectHistory = ({
  data=[]
}) => {
  const [itemList, setItemList] = useState(data);

  function handleDrop(result) {

    if(!result.destination) return;

    const items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemList(items);
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

      <div className={styles["column"]}>
      { itemList.map((data, i) => (
        <Draggable key={data.id} draggableId={data.id} index={i}>
        {(provided) => (
        
        
        <div
          key={i} 
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Card
            heading={data.name}
            data={data}
            footerLeft={() => {
              return (
                <div className={styles["date-placeholder"]}>
                  <SlCalender />
                  <p className="ml-5">
                    <FormattedDate mysqlDateTimeString={data?.createdAt} />
                  </p>
                </div>
              );
            }}
          >
            <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
              <p>{data.desc}</p>
              <div className={styles["tagContainer"]}>
              {
                  data.portfolio_tags.map((tag, i) => (
                    <div className={styles["tagAllign"]} key={i}>
                      <Tag
                        label={tag.tag}
                        inverse={true}
                      />
                    </div>
                  ))
                }
              </div>
              <div className={styles["imageContainer"]}>
                <Image 
                  // src={`/`+data.coverImage}
                  src={`${baseImageURL}${data.coverImage}`}
                  alt={data.coverImage}
                  width={400}
                  height={250}
                  sizes="100vw"
                  // fill={true}
                  style={{ borderRadius: 10}}

                  // layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </div>
          </Card>
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

export default projectHistory;
