import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";
import Paginator from "../Paginator/Paginator.jsx";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Table = ({
  data,
  headers,
  linesPerPage,
  disablePagination,
  className,
  wrapperClassName,
  headClassName,
  headerCellClassName,
  rowClassName,
  bodyClassName,
  bodyCellClassName,
  paginationGap,
}) => {
  if (linesPerPage < 1) {
    throw new Error("Invalid prop. linesPerPage should be bigger than 1");
  }
  const totalPages = Math.ceil(data.length / linesPerPage);
  const pagesArr = [...new Array(totalPages)].map((_, i) => i + 1);
  const [page, setPage] = useState(0);
  const onPageChange = ({ selected }) => setPage(selected);
  const startIndex = page * linesPerPage;
  return (
    <div className={classNames(styles.tableWrapper, wrapperClassName)}>
      <table className={classNames(styles.table, className)}>
        <TableHeader
          headers={headers}
          className={headClassName}
          headerCellClassName={headerCellClassName}
          rowClassName={rowClassName}
        />
        <TableBody
          data={data.slice(startIndex, startIndex + linesPerPage)}
          className={bodyClassName}
          rowClassName={rowClassName}
          bodyCellClassName={bodyCellClassName}
        />
      </table>
      {!disablePagination && pagesArr.length > 1 && (
        <Paginator
          className={styles.paginator}
          pageCount={pagesArr.length}
          {...{ onPageChange, paginationGap }}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  linesPerPage: PropTypes.number,
  disablePagination: PropTypes.bool,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  headClassName: PropTypes.string,
  headerCellClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyCellClassName: PropTypes.string,
  paginationGap: PropTypes.number,
};

Table.defaultProps = {
  linesPerPage: 10,
  disablePagination: false,
  paginationGap: 2,
};

export default Table;
