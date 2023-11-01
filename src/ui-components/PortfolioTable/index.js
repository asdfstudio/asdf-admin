import React, { useState } from "react";
import styles from "./table.module.css";
import { BASE_IMAGE_URL } from "urlConfig";
import Image from "next/image";
import { BiSort } from "react-icons/bi";

const baseImageURL = BASE_IMAGE_URL;

const PortfolioTable = ({ portfolios }) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const parseTotalSpentTime = (time) => {
    const regex = /(\d+) min (\d+) sec/;
    const match = time.match(regex);

    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      return minutes * 60 + seconds;
    }

    return 0;
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const customSortFunction = (a, b) => {
    const timeA = parseTotalSpentTime(a.totalSpentTime);
    const timeB = parseTotalSpentTime(b.totalSpentTime);

    if (sortOrder === "asc") {
      return timeA - timeB;
    } else {
      return timeB - timeA;
    }
  };

  const sortedPortfolios = [...portfolios].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "totalVisitor") {
      return sortOrder === "asc"
        ? a.totalVisitor - b.totalVisitor
        : b.totalVisitor - a.totalVisitor;
    } else if (sortBy === "totalSpentTime") {
      return customSortFunction(a, b);
    }
    return 0;
  });

  return (
    <div className={styles["table-container"]}>
      <table className={styles["portfolioTable"]}>
        <thead>
          <tr>
            <th className={styles["portfolioTable_th"]}>Image</th>
            <th
              className={styles["portfolioTable_th"]}
              onClick={() => handleHeaderClick("name")}
            >
              <div className={styles["portfolioTable_th_Container"]}>
                Name
                <BiSort/>
              </div>
            </th>
            <th
              className={styles["portfolioTable_th"]}
              onClick={() => handleHeaderClick("createdAt")}
            >
              <div className={styles["portfolioTable_th_Container"]}>
                Created
                <BiSort/>
              </div>
            </th>
            <th
              className={styles["portfolioTable_th"]}
              onClick={() => handleHeaderClick("totalSpentTime")}
            >
              <div className={styles["portfolioTable_th_Container"]}>
                Time
                <BiSort/>
              </div>
            </th>
            <th
              className={styles["portfolioTable_th"]}
              onClick={() => handleHeaderClick("totalVisitor")}
            >
              <div className={styles["portfolioTable_th_Container"]}>
                Visitors
                <BiSort/>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPortfolios.map((portfolio, index) => (
            <tr key={index}>
              <td className={styles["portfolioTable_td"]}>
                <Image
                  src={`${baseImageURL}/${portfolio.coverImage}`}
                  // src="/cover01.png"
                  alt={portfolio.name}
                  width={60}
                  height={60}
                  sizes="100vw"
                  style={{ borderRadius: 10, objectFit: "cover" }}
                  priority
                />
              </td>
              <td className={styles["portfolioTable_td"]}>{portfolio.name}</td>
              <td className={styles["portfolioTable_td"]}>
                {formatDate(portfolio.createdAt)}
              </td>
              <td className={styles["portfolioTable_td"]}>{portfolio.totalSpentTime}</td>
              <td className={styles["portfolioTable_td"]}>{portfolio.totalVisitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
