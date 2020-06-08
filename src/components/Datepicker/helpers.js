import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
const __MIN_VALID_YEAR = 1;

export const mapToArray = (num, callback) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(callback(i));
  }
  return arr;
};

const getYearMon = (year) => {
  const ym =
    typeof year === "object" && year.year
      ? { year: year.year, month: year.month, day: year.day }
      : { year };
  ym.min = { day: 1, month: 1 };
  ym.max = { day: 31, month: 12 };
  return ym;
};

export const getYearsByNum = (n, minYear) => {
  let maxYear = new Date().getFullYear();
  // n is number of years
  if (n && n > 0 && n < 1000) {
    minYear = minYear || maxYear - n + 1;
  }
  // n is invalid value
  else {
    // n is max year
    if (n && n >= 1000) maxYear = n;

    if (minYear) {
      n = maxYear - minYear + 1;
    } else {
      n = 5;
      minYear = maxYear - n + 1;
    }
  }
  return mapToArray(n, (i) => {
    return getYearMon(minYear + i);
  });
};

export const getYearArray = (years) => {
  if (Array.isArray(years)) return years.map((y, i) => getYearMon(y));
  if (typeof years === "object") {
    let n = 0;
    let min = 0;
    const ymin = getYearMon(years.min);
    const ymax = getYearMon(years.max);
    if (typeof ymin.year === "number" && ymin.year > __MIN_VALID_YEAR)
      min = ymin.year;
    if (typeof ymax.year === "number" && ymax.year >= min) n = ymax.year;
    const arr = getYearsByNum(n, min);
    const last = arr.length - 1;
    if (last >= 0) {
      arr[0].min = {
        month: ymin.month || arr[0].min.month,
        day: ymin.day || arr[0].min.day
      };
      arr[last].max = {
        month: ymax.month || arr[last].max.month,
        day: ymax.day || arr[last].max.day
      };
    }
    return arr;
  } else if (typeof years === "number" && years > 0)
    return getYearsByNum(years);
  else return getYearsByNum(5);
};

const validate = (d, years, idx, yearIndexes) => {
  const now = new Date();
  const thisYear = now.getFullYear();
  let ym;
  if (
    d &&
    typeof d.year === "number" &&
    d.year > __MIN_VALID_YEAR &&
    typeof d.month === "number" &&
    d.month >= 1 &&
    d.month <= 12
  ) {
    ym = d;
  }

  let foundThisYear;
  for (let i = 0; i < years.length; i++) {
    if (ym && years[i].year === ym.year) {
      yearIndexes[idx] = i;
      return ym;
    } else if (years[i].year === thisYear) {
      foundThisYear = i;
    }
  }

  if (typeof foundThisYear === "number") {
    yearIndexes[idx] = foundThisYear;
    return { year: thisYear };
  }

  const last = (yearIndexes[idx] = years.length - 1);
  return { year: years[last].year };
};

export const validValues = (v, years, yearIndexes) => {
  if (!v) return [];
  if (v[0] || v[1]) {
    const from = validate(v[0], years, 0, yearIndexes);
    const to = validate(v[1], years, 1, yearIndexes);
    if (
      from.year > to.year ||
      (from.year === to.year && from.month > to.month)
    ) {
      from.year = to.year;
      from.month = to.month;
      if (from.month < 1) {
        from.year--;
        from.month += 12;
      }
    }
    return [from, to];
  }
  return [validate(v, years, 0, yearIndexes)];
};

export const getDID = (e) => {
  const el = e.target;
  return el.dataset ? el.dataset.id : el.getAttribute("data-id");
};

export const duplicateToArray = (elem) => [elem, elem];

export const getInitialYears = (values, yearsState) => {
  if (!yearsState) return [];

  const defaultYearValue = yearsState[0].year;

  if (!values || isEmpty(values)) return duplicateToArray(defaultYearValue);

  const firstYearSelected = values[0] && values[0].year;
  const secondYearSelected = values[1] && values[1].year;

  return firstYearSelected && secondYearSelected
    ? [firstYearSelected, secondYearSelected]
    : firstYearSelected && !secondYearSelected
    ? duplicateToArray(firstYearSelected)
    : duplicateToArray(defaultYearValue);
};

export const hasDateValueChanged = (newDate, prevDate) => {
  return !isEqual(newDate, prevDate);
};

export const getIndexByYear = (year, yearsArr) =>
  yearsArr.reduce((acc, curr, index) => {
    if (curr.year === year) return index;
    return acc;
  }, 0);

export const makeLabelText = (values) => {
  if (!values || !values.length) return "Pick a date";
  function makeText(value) {
    return value && value.year && value.month
      ? `${value.day ? `${value.day}/` : ""}${value.month}/${value.year}`
      : "";
  }
  const firstDateLabel = makeText(values[0]);
  const secondDateLabel = makeText(values[1]);
  return firstDateLabel === secondDateLabel
    ? firstDateLabel
    : secondDateLabel
    ? `${firstDateLabel} - ${secondDateLabel}`
    : firstDateLabel;
};
