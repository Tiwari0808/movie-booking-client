const getHours = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${hour}h ${minute}m`;
};

export default getHours;
