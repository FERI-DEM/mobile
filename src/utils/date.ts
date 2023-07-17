export const getTimeString = (dateString: string) => {
  const date = new Date(
    new Date(dateString).getTime() + new Date().getTimezoneOffset() * 60000
  );
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getMonthName = (monthNumber: number): string => {
  const months = [
    'Januar',
    'Februar',
    'Marec',
    'April',
    'Maj',
    'Junij',
    'Julij',
    'Avgust',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  if (monthNumber >= 0 && monthNumber <= 11) {
    return months[monthNumber];
  } else {
    return 'Neznano';
  }
};
