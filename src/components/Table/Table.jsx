import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";
import Icon from "../Icon/Icon.jsx";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { useTheme, getThemeProperty } from "../../theme";

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
  bodyCellClassName
}) => {
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

  const { theme } = useTheme();
  const arrowIconBackground = getThemeProperty(
    theme,
    "table-page-arrow-background"
  );
  const disabledArrowColor = getThemeProperty(theme, "color-gray");
  const arrowColor = getThemeProperty(theme, "color-primary");
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
        <div className={styles.pages}>
          <span
            className={
              canGoBack ? styles.pageItemArrow : styles.pageItemArrowDisabled
            }
            onClick={previousPage}>
            <Icon
              type="left"
              size="lg"
              backgroundColor={arrowIconBackground}
              iconColor={canGoBack ? arrowColor : disabledArrowColor}
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
              backgroundColor={arrowIconBackground}
              iconColor={canGoNext ? arrowColor : disabledArrowColor}
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
  disablePagination: PropTypes.bool,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  headClassName: PropTypes.string,
  headerCellClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyCellClassName: PropTypes.string
};

Table.defaultProps = {
  linesPerPage: 10,
  disablePagination: false
};

export default Table;
