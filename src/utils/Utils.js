//{/* 2023-11-28 */}
export function formatDate(dateStr, show = false) {
  let date = new Date(dateStr);
  let m = date.getMonth() + 1; //returns month from 0
  let d = date.getDate();
  let y = date.getFullYear();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  if (show) {
    return `${d}/${m}/${y}`;
  } else {
    return `${y}-${m}-${d}`;
  }
}
