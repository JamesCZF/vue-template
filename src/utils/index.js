export function formatTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart('0', 2);
  const day = `${date.getDate()}`.padStart('0', 2);
  const hour = `${date.getHours()}`.padStart('0', 2);
  const minute = `${date.getMinutes()}`.padStart('0', 2);
  const second = `${date.getSeconds()}`.padStart('0', 2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}