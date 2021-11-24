export const getMonthYearFromDate = (date) =>
  new Date(date).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
