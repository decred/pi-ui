import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((line) => (
        <tr className={styles.tableRow}>
          {Object.keys(line).map((key) => (
            <td className={styles.tableBodyCell} data-label={key}>
              <span className={styles.tableBodyCellText}>{line[key]}</span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.object.isRequired
};

export default TableBody;
