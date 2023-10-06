const monthsArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dateFormater = (date?: string) => {
  if (!date) return null;

  const dateObject = new Date(date);
  const localDate = new Date(dateObject.getTime() - dateObject.getTimezoneOffset() * 60 * 1000);

  const month = monthsArr[localDate.getMonth()];
  const day = localDate.getDate();
  const year = localDate.getFullYear();
  const hours = localDate.getHours() < 10 ? `0${localDate.getHours()}` : localDate.getHours();
  const minutes = localDate.getMinutes() < 10 ? `0${localDate.getMinutes()}` : localDate.getMinutes();
  return { month, day, year, hours, minutes };
};
