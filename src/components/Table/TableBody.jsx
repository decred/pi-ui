import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((line, lineIdx) => (
        <tr key={`line-${lineIdx}`} className={styles.tableRow}>
          {Object.keys(line).map((key, keyIdx) => (
            <td
              key={`field-${keyIdx}`}
              className={styles.tableBodyCell}
              data-label={key}>
              <span className={styles.tableBodyCellText}>{line[key]}</span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired
};

export default TableBody;
