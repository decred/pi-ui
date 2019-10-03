import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const TableBody = ({ data, className, rowClassName, bodyCellClassName }) => {
  return (
    <tbody className={className}>
      {data.map((line, lineIdx) => (
        <tr
          key={`line-${lineIdx}`}
          className={classNames(styles.tableRow, rowClassName)}>
          {Object.keys(line).map((key, keyIdx) => (
            <td
              key={`field-${keyIdx}`}
              className={classNames(styles.tableBodyCell, bodyCellClassName)}
              data-label={key}>
              {typeof line[key] === "string" ? (
                <span className={styles.tableBodyCellText}>{line[key]}</span>
              ) : (
                line[key]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  bodyCellClassName: PropTypes.string
};

export default TableBody;
