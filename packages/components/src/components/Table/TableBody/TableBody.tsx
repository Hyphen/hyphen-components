import React from 'react';
import classNames from 'classnames';
import styles from './TableBody.module.scss';
import { Column, Row } from '../../../types';
import { TableRow } from '../common/TableRow/TableRow';

export interface TableBodyProps<TRow extends object = Row> {
  /**
   * The table columns to be rendered
   */
  columns: Column<TRow>[];
  /**
   * The unique key to identify a React node for each row.
   */
  rowKey: Extract<keyof TRow, string>;
  /**
   * The table rows to be rendered
   */
  rows: TRow[];
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * A custom class to apply to the table body.
   */
  className?: string;
  /**
   * A global placeholder for empty cells. Note: can be overwriten by
   * the same attribute passed for an individual column config object.
   */
  emptyCellPlaceholder?: string | number | undefined;
  /**
   * Enable a hover state on table rows.
   */
  hoverableRows?: boolean;
  /**
   * Whether the table has borders or not.
   */
  isBorderless?: boolean;
  /**
   * Whether the table rows have smaller padding
   */
  isCompact?: boolean;
  /**
   * Whether the table rows have a striped pattern
   */
  isStriped?: boolean;
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific Column
   */
  truncateOverflow?: boolean;
}

export const TableBody = <TRow extends object = Row,>({
  columns,
  rows,
  rowKey,
  align = 'left',
  className = '',
  emptyCellPlaceholder = '',
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  isStriped = false,
  truncateOverflow = false,
}: TableBodyProps<TRow>) => {
  const tableBodyClasses = classNames(
    styles['table-body'],
    {
      [styles.striped]: isStriped,
      [styles.hover]: hoverableRows,
    },
    className
  );

  return (
    <tbody className={tableBodyClasses}>
      {rows.map((row, rowIndex) => (
        <TableRow
          columns={columns}
          row={row}
          rowIndex={rowIndex}
          align={align}
          key={String(row[rowKey])}
          emptyCellPlaceholder={emptyCellPlaceholder}
          truncateOverflow={truncateOverflow}
          isBorderless={isBorderless}
          isCompact={isCompact}
        />
      ))}
    </tbody>
  );
};
