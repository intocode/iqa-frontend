import { theme } from './theme';
import { getBaseUrl } from '../common/utils/url';

const lsPrefix = 'iqa_';

export const BASE_API_URL = getBaseUrl();

export const LS_TOKEN_KEY = `${lsPrefix}accessToken`;

export const AUTHORIZE_SERVICE_URL = `${BASE_API_URL}auth/github`;

export const QUESTIONS_PER_PAGE = 5;

export const AVAILABLE_THEME_COLORS = Object.keys(theme.colors);
export const DEFAULT_COLOR = theme.defaultColor;
export const SCROLL_TO_TOP_SHOW = 500;
