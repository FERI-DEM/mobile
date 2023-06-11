export const getTimeString = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
