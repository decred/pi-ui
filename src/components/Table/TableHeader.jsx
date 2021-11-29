import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const TableHeader = ({
  headers,
  headerCellClassName,
  rowClassName,
  className,
}) => {
  return (
    <thead className={classNames(styles.tableHead, className)}>
      <tr className={classNames(styles.tableRow, rowClassName)}>
        {headers.map((header, idx) => (
          <th
            key={`header-${idx}`}
            className={classNames(styles.tableHeadCell, headerCellClassName)}
            scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  headerCellClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  className: PropTypes.string,
};

export default TableHeader;
