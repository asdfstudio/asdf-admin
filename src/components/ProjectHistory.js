import Card from "@aio/components/Card";

import styles from "../components/style/component.module.css"
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import Tag from "@aio/components/Tag";

const projectHistory = ({
  data=[]
}) => {
  return (
    <div className={styles["row"]}>
      { data.map((data, i) => (
        <>
        <div className={styles["column"]} key={i}>
          <Card
            heading={data.project}
            data={data}
            footerLeft={() => {
              return (
                <div className={styles["date-placeholder"]}>
                  <SlCalender />
                  <p className="ml-5">{data.projectDate}</p>
                </div>
              );
            }}
          >
            <div style={{ margin: "10px", display:"flex", flexDirection:"column", gap:"20px" }}>
              <p>{data.desc}</p>
              <div className={styles["tagContainer"]}>
              {
                  data.tags.map((tag, i) => (
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
                  src={`/`+data.coverImage}
                  alt={data.coverImage}
                  width={"0"}
                  height={"0"}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            </Card>
          </div>
        </>
    ))}
    </div>
  );
};

export default projectHistory;
