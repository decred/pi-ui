import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./styles.css";

const Table = ({ data, headers, linesPerPage }) => {
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
    <div>
      <table className={styles.table}>
        <TableHeader headers={headers} />
        <TableBody data={data.slice(startIndex, startIndex + linesPerPage)} />
      </table>
      <div className={styles.pages}>
        <span
          className={
            canGoBack ? styles.pageItemArrow : styles.pageItemArrowDisabled
          }
          onClick={previousPage}>
          &larr;
        </span>
        {pagesArr.map((item) => (
          <span
            className={item === page ? styles.pageItemActive : styles.pageItem}
            onClick={() => setPage(item)}>
            {item}
          </span>
        ))}
        <span
          className={
            canGoNext ? styles.pageItemArrow : styles.pageItemArrowDisabled
          }
          onClick={nextPage}>
          &rarr;
        </span>
      </div>
    </div>
  );
};

Table.defaultProps = {
  linesPerPage: 10
};

Table.propTypes = {
  data: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  linesPerPage: PropTypes.number
};

export default Table;
