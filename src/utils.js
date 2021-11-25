export const getDateStringFromDateKey = (dateKey) =>
  new Date(dateKey).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

export const getCurrentDateString = () =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

export const getCurrentMonthKey = () => new Date().toISOString().slice(0, 7);
export const getMonthKeyFromDateString = (dateString) =>
  new Date(dateString).toISOString().slice(0, 7);
