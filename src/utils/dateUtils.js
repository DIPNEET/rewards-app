export const isInLastThreeMonths = (date, reference = new Date()) => {
  const d = new Date(date);
  const ref = new Date(reference);

  const refMonth = ref.getMonth();
  const refYear = ref.getFullYear();

  const threeMonthsAgo = new Date(refYear, refMonth - 2, 1);
  const nextMonth = new Date(refYear, refMonth + 1, 1);

  return d >= threeMonthsAgo && d < nextMonth;
};

export const filterByMonthYear = (transactions, monthValue, year) => {
  if (monthValue === 'LAST_3') {
    return transactions.filter((t) => isInLastThreeMonths(t.date));
  }
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === monthValue;
  });
};
