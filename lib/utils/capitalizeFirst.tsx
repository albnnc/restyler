export const capitalizeFirst = (data?: string) => {
  return data ? data.charAt(0).toUpperCase() + data.slice(1) : data;
};
