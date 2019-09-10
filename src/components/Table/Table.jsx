import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";
import Icon from "../Icon/Icon.jsx";
import styles from "./styles.css";

const Table = ({ data, headers, linesPerPage, disablePagination }) => {
  if (linesPerPage < 1) {
    throw new Error("Invalid prop. linesPerPage should be bigger than 1");
  }
  const totalPages = Math.ceil(data.length / linesPerPage);
  const pagesArr = [...new Array(totalPages)].map((_, i) => i + 1);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * linesPerPage;
  const canGoBack = page > 1;
  const canGoNext = page < totalPages;
  const previousPage = () => (canGoBack ? setPage(page - 1) : null);
  const nextPage = () => (canGoNext ? setPage(page + 1) : null);
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <TableHeader headers={headers} />
        <TableBody data={data.slice(startIndex, startIndex + linesPerPage)} />
      </table>
      {!disablePagination && pagesArr.length > 1 && (
        <div className={styles.pages}>
          <span
            className={
              canGoBack ? styles.pageItemArrow : styles.pageItemArrowDisabled
            }
            onClick={previousPage}>
            <Icon
              type="left"
              size="lg"
              backgroundColor="#fff"
              iconColor={canGoBack ? "#2970ff" : "#8997a5"}
            />
          </span>
          {pagesArr.map((item, idx) => (
            <span
              key={`page-number-${idx}`}
              className={
                item === page ? styles.pageItemActive : styles.pageItem
              }
              onClick={() => setPage(item)}>
              {item}
            </span>
          ))}
          <span
            className={
              canGoNext ? styles.pageItemArrow : styles.pageItemArrowDisabled
            }
            onClick={nextPage}>
            <Icon
              type="right"
              size="lg"
              backgroundColor="#fff"
              iconColor={canGoNext ? "#2970ff" : "#8997a5"}
            />
          </span>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  linesPerPage: PropTypes.number,
  disablePagination: PropTypes.bool
};

Table.defaultProps = {
  linesPerPage: 10,
  disablePagination: false
};

export default Table;
