import { Key } from 'react';
import { Column, Row } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getColumnKeys = <TRow extends object = Row>(
  columns: Column<TRow>[]
): Key[] => {
  const INTERNAL_KEY_PREFIX = 'columnKeyPrefix';
  const columnKeys: Key[] = [];
  const keys: Record<string, boolean> = {};

  columns.forEach((column) => {
    const { key, dataKey } = column || {};
    const shapedDataKey = dataKey?.includes(' ')
      ? dataKey.split(' ').join('-')
      : dataKey;

    let mergedKey = key || shapedDataKey || INTERNAL_KEY_PREFIX;

    while (keys[String(mergedKey)]) {
      mergedKey = `${mergedKey}_next`;
    }
    keys[String(mergedKey)] = true;

    columnKeys.push(mergedKey);
  });

  return columnKeys;
};
