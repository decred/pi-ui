const __MIN_VALID_YEAR = 1;

export const mapToArray = (num, callback) => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(callback(i));
  }
  return arr;
};

const getYearMon = (year, min, max) => {
  const ym =
    typeof year === "object" && year.year
      ? { year: year.year, month: year.month }
      : { year };
  ym.min = min || 1;
  ym.max = max || 12;
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
      arr[0].min = ymin.month || arr[0].month;
      arr[last].max = ymax.month || arr[last].month;
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
  if (v.from || v.to) {
    const from = validate(v.from, years, 0, yearIndexes);
    const to = validate(v.to, years, 1, yearIndexes);
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
