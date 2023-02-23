import { MAX_LAST_COMMENT_LENGTH } from 'app/constants';

export const truncateLongText = (value) => {
  let str = value;
  const maxLength = MAX_LAST_COMMENT_LENGTH;
  if (str.length > maxLength) {
    str = str.slice(0, maxLength);
    const lastSpaceIndex = str.lastIndexOf(' ');
    str = str.slice(0, lastSpaceIndex > -1 ? lastSpaceIndex : maxLength);
    str += '...';
  }
  return str;
};
