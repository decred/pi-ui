import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";

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

const Paginator = ({
  pageCount,
  pageRangeDisplayed,
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

  if (pageCount <= 0) {
    return null;
  }

  const pageButtons = [];
  const halfOfTheSiblings = Math.floor(pageRangeDisplayed / 2);
  let leftSiblingIndex = limitIndex(selectedPage - halfOfTheSiblings);
  let rightSiblingIndex = limitIndex(selectedPage + halfOfTheSiblings);
  const leftSiblingCount = selectedPage - leftSiblingIndex;
  const rightSiblingCount = rightSiblingIndex - selectedPage;

  // e.g. 12345...10
  //      !^  *
  // increase the siblings on the right side(*), if the selected page(^) is at
  // the beginning of the list and there is no space on the left side(!)
  if (leftSiblingCount < halfOfTheSiblings) {
    rightSiblingIndex = limitIndex(
      rightSiblingIndex + halfOfTheSiblings - leftSiblingCount
    );
  }
  // e.g. 1.....6789
  //            * ^!
  // increase the siblings on the left side(*), if the selected page(^) is at
  // the end of the list and there is no space on the right side(!)
  if (rightSiblingCount < halfOfTheSiblings) {
    leftSiblingIndex = limitIndex(
      leftSiblingIndex - (halfOfTheSiblings - rightSiblingCount)
    );
  }

  let startIndex = 0;

  // add the left margin and the brake button if necessary
  if (leftSiblingIndex > marginPagesDisplayed) {
    for (let i = 0; i < marginPagesDisplayed; i++) {
      pageButtons.push(<PageButton onClick={onClickHandler} index={i} />);
    }
    pageButtons.push(
      <BrakeButton
        onClick={() => onClickHandler(selectedPage - pageRangeDisplayed)}
      />
    );
    startIndex = leftSiblingIndex;
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
  if (rightSiblingIndex < pageCount - marginPagesDisplayed - 1) {
    pageButtons.push(
      <BrakeButton
        onClick={() =>
          onClickHandler(Math.min(pageCount, selectedPage + pageRangeDisplayed))
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

  return (
    <div className={classNames(styles.paginator, className)}>
      <button
        onClick={() => onClickHandler(selectedPage - 1)}
        aria-label="Previous page"
        disabled={selectedPage === 0}
        className={classNames(styles.arrowButton, styles.previous)}>
        <Icon
          type="arrow"
          viewBox="0 0 14 13"
          width={14}
          height={13}
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
        disabled={selectedPage === pageCount - 1}
        className={classNames(styles.arrowButton, styles.next)}>
        <Icon
          type="arrow"
          viewBox="0 0 14 13"
          width={14}
          height={13}
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
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

Paginator.defaultProps = {
  pageRangeDisplayed: 4,
  marginPagesDisplayed: 1,
};

export default Paginator;
