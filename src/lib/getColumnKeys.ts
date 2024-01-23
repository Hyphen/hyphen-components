import { Key } from 'react';
import { Column } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getColumnKeys = (columns: Column[]): Key[] => {
  const INTERNAL_KEY_PREFIX = 'columnKeyPrefix';
  const columnKeys: React.Key[] = [];
  const keys: Record<any, boolean> = {};

  columns.forEach((column) => {
    const { key, dataKey } = column || {};
    const shapedDataKey = dataKey?.includes(' ')
      ? dataKey.split(' ').join('-')
      : dataKey;

    let mergedKey = key || shapedDataKey || INTERNAL_KEY_PREFIX;

    while (keys[mergedKey as any]) {
      mergedKey = `${mergedKey}_next`;
    }
    keys[mergedKey as any] = true;

    columnKeys.push(mergedKey);
  });

  return columnKeys;
};
