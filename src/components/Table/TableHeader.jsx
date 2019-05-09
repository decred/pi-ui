import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TableHeader = ({ headers }) => {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {headers.map((header) => (
          <th className={styles.tableHeadCell} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TableHeader;
