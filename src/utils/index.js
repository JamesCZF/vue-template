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

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}