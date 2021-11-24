import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";
import Icon from "../Icon/Icon.jsx";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { useTheme, getThemeProperty } from "../../theme";

const collapsePages = (pages, current, gap) => {
  let pagesToShow = pages.reduce((acc, value) => {
    const hideItem = value < current - gap || value > current + gap;
    return hideItem ? acc : [...acc, { label: value, value }];
  }, []);
  const first = { label: 1, value: 1 };
  const left = { label: "...", value: current - gap - 1 };
  const right = { label: "...", value: current + gap + 1 };
  const last = { label: pages.length, value: pages.length };

  // append the (...) if there are pages with a smaller index on left
  // and include the first page if needed
  if (current - gap > gap) {
    pagesToShow = [left, ...pagesToShow];
  }
  if (current - gap >= gap) {
    pagesToShow = [first, ...pagesToShow];
  }

  // append the (...) if there are pages with a bigger index on right
  // and include the last page if needed
  if (current + gap < pages.length - 1) {
    pagesToShow = [...pagesToShow, right];
  }
  if (current + gap < pages.length) {
    pagesToShow = [...pagesToShow, last];
  }

  return pagesToShow;
};

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
            data-testid="back"
            onClick={previousPage}>
            <Icon
              type="left"
              size="lg"
              backgroundColor={arrowIconBackground}
              iconColor={canGoBack ? arrowColor : disabledArrowColor}
            />
          </span>
          {collapsePages(pagesArr, page, paginationGap).map(
            ({ value, label }, idx) => (
              <span
                key={`page-number-${idx}`}
                className={
                  value === page ? styles.pageItemActive : styles.pageItem
                }
                onClick={() => setPage(value)}>
                {label}
              </span>
            )
          )}
          <span
            className={
              canGoNext ? styles.pageItemArrow : styles.pageItemArrowDisabled
            }
            data-testid="next"
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
