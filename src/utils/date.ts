export const getTimeString = (dateString: string) => {
  const date = new Date(
    new Date(dateString).getTime() + new Date().getTimezoneOffset() * 60000
  );
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};
