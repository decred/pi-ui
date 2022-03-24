import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";
import { useTheme, getThemeProperty } from "../../theme";

const PageButton = ({ onClick, index }) => (
  <button onClick={() => onClick(index)}>{`${index + 1}`}</button>
);
const BrakeButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.brake}>
    ...
  </button>
);
const SelectedPageButton = ({ index }) => (
  <button disabled className={styles.selected}>{`${index + 1}`}</button>
);

const BRAKE = 1;
const SELECTED = 1;

const Paginator = ({
  pageCount,
  paginationGap,
  marginPagesDisplayed,
  onPageChange,
  className,
}) => {
  const [selectedPage, setSelectedPage] = React.useState(0);
  const limitIndex = React.useCallback(
    (index) => Math.min(pageCount - 1, Math.max(0, index)),
    [pageCount]
  );
  const onClickHandler = React.useCallback(
    (index) => {
      const limitedIndex = limitIndex(index);
      setSelectedPage(limitedIndex);
      onPageChange && onPageChange({ selected: limitedIndex });
    },
    [onPageChange, limitIndex]
  );

  const { theme } = useTheme();
  const arrowColor = getThemeProperty(theme, "color-primary");
  const disabledArrowColor = getThemeProperty(theme, "color-gray");
  const canGoBack = selectedPage > 0;
  const canGoNext = selectedPage < pageCount - 1;

  if (pageCount <= 0) {
    return null;
  }

  const pageButtons = [];
  const pageRangeDisplayed = paginationGap * 2;

  // there is no space for collapsing
  if (
    pageRangeDisplayed + marginPagesDisplayed * 2 + BRAKE + SELECTED >=
    pageCount
  ) {
    // add the left siblings
    for (let i = 0; i < selectedPage; i++) {
      pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
    }

    // add the selected page button
    pageButtons.push(<SelectedPageButton index={selectedPage} />);

    // add the right siblings
    for (let i = selectedPage + 1; i < pageCount; i++) {
      pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
    }
  } else {
    let leftSiblingIndex = limitIndex(selectedPage - paginationGap);
    let rightSiblingIndex = limitIndex(selectedPage + paginationGap);
    let startIndex = 0;

    // add the left margin and the brake button if necessary
    if (leftSiblingIndex >= marginPagesDisplayed + BRAKE) {
      for (let i = 0; i < marginPagesDisplayed; i++) {
        pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
      }
      pageButtons.push(
        <BrakeButton
          onClick={() => onClickHandler(selectedPage - pageRangeDisplayed)}
        />
      );
      startIndex = leftSiblingIndex;
    } else {
      // e.g. 12345...10
      //      !^  *
      // increase the siblings on the right side(*), if the selected page(^) is at
      // the beginning of the list and there is no space on the left side(!)
      rightSiblingIndex = limitIndex(
        marginPagesDisplayed + BRAKE + pageRangeDisplayed
      );
    }

    const isTailCollapsed =
      rightSiblingIndex < pageCount - marginPagesDisplayed - BRAKE;

    if (!isTailCollapsed) {
      // e.g. 1.....6789
      //            * ^!
      // increase the siblings on the left side(*), if the selected page(^) is at
      // the end of the list and there is no space on the right side(!)
      startIndex = limitIndex(
        pageCount - marginPagesDisplayed - pageRangeDisplayed - BRAKE - SELECTED
      );
    }

    // add the left siblings
    for (let i = startIndex; i < selectedPage; i++) {
      pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
    }

    // add the selected page button
    pageButtons.push(<SelectedPageButton index={selectedPage} />);

    // add the right siblings
    for (let i = selectedPage + 1; i <= rightSiblingIndex; i++) {
      pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
    }

    // add the right margin and the brake button if necessary,
    // or just the right siblings
    if (isTailCollapsed) {
      pageButtons.push(
        <BrakeButton
          onClick={() =>
            onClickHandler(
              Math.min(pageCount, selectedPage + pageRangeDisplayed)
            )
          }
        />
      );
      for (let i = pageCount - marginPagesDisplayed; i < pageCount; i++) {
        pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
      }
    } else {
      for (let i = rightSiblingIndex + 1; i < pageCount; i++) {
        pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
      }
    }
  }

  return (
    <div className={classNames(styles.paginator, className)}>
      <button
        onClick={() => onClickHandler(selectedPage - 1)}
        aria-label="Previous page"
        disabled={!canGoBack}
        className={classNames(styles.arrowButton, styles.previous)}>
        <Icon
          type="arrow"
          viewBox="0 0 14 13"
          width={14}
          height={13}
          iconColor={canGoBack ? arrowColor : disabledArrowColor}
          data-testid="back"
          className={styles.icon}
        />
      </button>
      {pageButtons.map((button, i) =>
        React.cloneElement(button, {
          key: i + Math.random(),
        })
      )}
      <button
        onClick={() => onClickHandler(selectedPage + 1)}
        aria-label="Next page"
        disabled={!canGoNext}
        className={classNames(styles.arrowButton, styles.next)}>
        <Icon
          type="arrow"
          viewBox="0 0 14 13"
          width={14}
          height={13}
          iconColor={canGoNext ? arrowColor : disabledArrowColor}
          data-testid="next"
          className={styles.icon}
        />
      </button>
    </div>
  );
};

BrakeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

PageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

SelectedPageButton.propTypes = {
  index: PropTypes.number.isRequired,
};

Paginator.propTypes = {
  pageCount: PropTypes.number.isRequired,
  paginationGap: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

Paginator.defaultProps = {
  paginationGap: 2,
  marginPagesDisplayed: 1,
};

export default Paginator;
