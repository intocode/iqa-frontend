import { MAX_LAST_COMMENT_LENGTH } from 'app/constants';

export const truncateLongText = (value) => {
  let str = value;
  if (str.length > MAX_LAST_COMMENT_LENGTH) {
    str = str.slice(0, MAX_LAST_COMMENT_LENGTH);
    const lastSpaceIndex = str.lastIndexOf(' ');
    str = str.slice(0, lastSpaceIndex > -1 ? lastSpaceIndex : MAX_LAST_COMMENT_LENGTH);
    str += '...';
  }
  return str;
};
