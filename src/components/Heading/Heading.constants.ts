export type HEADING_LEVELS_TYPE = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const HEADING_LEVELS: HEADING_LEVELS_TYPE[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]; // eslint-disable-line import/prefer-default-export

export const HEADING_DEFAULT_SIZE_MAP = {
  h1: '4xl',
  h2: '3xl',
  h3: '1xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'sm',
};
