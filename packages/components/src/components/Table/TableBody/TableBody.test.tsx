import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Column } from '../../../types';
import { TableBody } from './TableBody';

const columns = [
  { heading: 'ID', dataKey: 'id' },
  { heading: 'Color', dataKey: 'color' },
  { heading: 'Flavor', dataKey: 'flavor' },
];

const rows = [
  { id: 1, color: 'red', flavor: 'vanilla' },
  { id: 2, color: 'blue', flavor: 'chocolate' },
  { id: 3, color: 'green', flavor: 'strawberry' },
];

const inputColumns: Column<(typeof rows)[number]>[] = [
  {
    dataKey: 'color',
    render: (_cell, row) => (
      <input
        aria-label={`Color for row ${row?.id}`}
        defaultValue={row?.color}
      />
    ),
  },
];

describe('TableBody', () => {
  test("It renders with striped rows if passed 'isStriped' prop", () => {
    render(<TableBody columns={columns} rows={rows} rowKey="id" isStriped />);

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('striped');
  });

  test('It renders with a custom class when passed as a prop', () => {
    render(
      <TableBody
        columns={columns}
        rows={rows}
        rowKey="id"
        className="my-custom-class"
      />
    );

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('my-custom-class');
  });

  test('It preserves row identity when rows are reordered', () => {
    const { rerender } = render(
      <table>
        <TableBody columns={inputColumns} rows={rows} rowKey="id" />
      </table>
    );

    fireEvent.change(screen.getByLabelText('Color for row 1'), {
      target: { value: 'purple' },
    });

    rerender(
      <table>
        <TableBody
          columns={inputColumns}
          rows={[...rows].reverse()}
          rowKey="id"
        />
      </table>
    );

    expect(screen.getByLabelText('Color for row 1')).toHaveValue('purple');
  });

  test('It avoids duplicate keys when row key values cannot be used', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const rowsWithoutUsableKeys = [
      { id: undefined, color: 'red' },
      { id: undefined, color: 'blue' },
      { id: null, color: 'green' },
      { id: null, color: 'yellow' },
      { id: {}, color: 'black' },
      { id: {}, color: 'white' },
    ];

    render(
      <table>
        <TableBody
          columns={[{ dataKey: 'color' }]}
          rows={rowsWithoutUsableKeys}
          rowKey="id"
        />
      </table>
    );

    const duplicateKeyWarnings = consoleError.mock.calls.filter((call) =>
      call.some(
        (argument) =>
          typeof argument === 'string' &&
          argument.includes('Encountered two children with the same key')
      )
    );
    consoleError.mockRestore();

    expect(duplicateKeyWarnings).toHaveLength(0);
  });
});
