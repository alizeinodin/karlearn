const trimSlash = (value = '') => value.replace(/\/+$/, '');

export const BASENAME = trimSlash(process.env.REACT_APP_BASENAME || '');
export const API_BASE = trimSlash(process.env.REACT_APP_API_BASE || '/api') || '/api';
export const ASSET_BASE = trimSlash(
  process.env.REACT_APP_ASSET_BASE || BASENAME || ''
);

export const apiUrl = (path = '') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
};

export const assetUrl = (path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${ASSET_BASE}${normalized}`;
};
