import { MAX_LAST_COMMENT_LENGTH } from 'app/constants';

export const changeLastCommentLength = (value) => {
  let str = value;
  if (str.length > 140) {
    str = str.slice(0, MAX_LAST_COMMENT_LENGTH);
    str = str.substr(0, Math.min(str.length, str.lastIndexOf(' ')));
    str += '...';
  }
  return str;
};
