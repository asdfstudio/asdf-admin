import Image from "next/image";
import styles from "./Table.module.css";

const Table = ({
  mainHeading,
  subHeading,
  headingRightItem = () => {},
  heading,
  data,
}) => {
  return (
    
    <section className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <div>
          {mainHeading && <h4 className="s-16">{mainHeading}</h4>}
          {subHeading && <p className="s-12 tc-grey">{subHeading}</p>}
        </div>
        <div>{headingRightItem()}</div>
      </div>
      <div className={styles["table-wrapper"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              {heading.map((th, i) => (
                <>
                  {th.icon ? (
                    <th key={i}>
                      <span>{th.heading}</span>
                      <span style={{paddingLeft: "5px"}}>
                        <th.icon />
                      </span>
                    </th>
                  ) : (
                    <th key={i}>{th.heading}</th>
                  )}
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((tr, i) => (
              <tr key={i}>
                {heading.map((th, i) => {
                  const td = tr[th.key];
                  return td.component ? (
                    <td>{td.component()}</td>
                  ) : td.icon ? (
                    <td>
                      <span>
                        <td.icon />
                      </span>
                      <span>{td.value}</span>
                    </td>
                  ) : td.image ? (
                    <td>
                      <Image 
                        src={`/`+td.image}
                        alt={td.image}
                        width={'70'}
                        height={'60'}
                    />
                    </td>
                  )
                  : (
                    <td>{td.value}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </section>
  );
};

export default Table;
