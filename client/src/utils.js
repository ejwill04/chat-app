export const sanitizeString = str => {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
};