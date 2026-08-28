import React from 'react';
import { Alert, AlertProps } from '../src/components/Alert/Alert';
import { Badge, BadgeProps } from '../src/components/Badge/Badge';
import { Box, BoxProps } from '../src/components/Box/Box';
import { CheckboxInput } from '../src/components/CheckboxInput/CheckboxInput';
import { Details } from '../src/components/Details/Details';
import { Drawer } from '../src/components/Drawer/Drawer';
import { Icon } from '../src/components/Icon/Icon';
import { Modal } from '../src/components/Modal/Modal';
import { SelectInputNative } from '../src/components/SelectInputNative/SelectInputNative';
import { Table } from '../src/components/Table/Table';
import type { Column } from '../src/types';

type Assert<T extends true> = T;
type ExcludesKey<T, K extends PropertyKey> = K extends keyof T ? false : true;

export type AlertExcludesMessage = Assert<
  ExcludesKey<AlertProps, 'message'>
>;
export type BadgeExcludesMessage = Assert<
  ExcludesKey<BadgeProps, 'message'>
>;
export type BoxExcludesMessage = Assert<ExcludesKey<BoxProps, 'message'>>;

const buttonRef = React.createRef<HTMLButtonElement>();
const detailsRef = React.createRef<HTMLDetailsElement>();
const drawerRef = React.createRef<HTMLDivElement>();
const iconRef = React.createRef<SVGSVGElement>();

interface InterfaceTableRow {
  id: string;
  label: string;
  isEnabled: boolean;
}

const interfaceTableRows: InterfaceTableRow[] = [
  { id: 'row-1', label: 'First row', isEnabled: true },
];
const interfaceTableColumns: Column<InterfaceTableRow>[] = [
  {
    dataKey: 'label',
    render: (_cell, row) => row?.label,
  },
];

const validComponents = (
  <>
    <Alert>Message</Alert>
    <Box as="button" type="button" disabled ref={buttonRef} />
    <Badge as="button" type="button" disabled ref={buttonRef}>
      Badge
    </Badge>
    <CheckboxInput
      id="terms"
      isChecked
      label="Accept terms"
      name="terms"
      onChange={() => undefined}
    />
    <Details isOpen ref={detailsRef} />
    <Drawer isOpen ariaLabel="Drawer" ref={drawerRef} />
    <Icon name="user" ref={iconRef} />
    <Modal isOpen onDismiss={() => undefined} />
    <SelectInputNative
      id="flavor"
      label="Flavor"
      options={[]}
      value={null}
      onChange={() => undefined}
      form="settings-form"
      onFocus={(event) => event.currentTarget.checkValidity()}
    />
    <Table
      columns={interfaceTableColumns}
      rows={interfaceTableRows}
      rowKey="id"
    />
  </>
);

const invalidInterfaceTableColumns: Column<InterfaceTableRow>[] = [
  {
    // @ts-expect-error dataKey must reference a key on the row interface.
    dataKey: 'missing',
  },
];

const tableWithInvalidRowKey = (
  <Table<InterfaceTableRow>
    columns={interfaceTableColumns}
    rows={interfaceTableRows}
    // @ts-expect-error rowKey must reference a key on the row interface.
    rowKey="missing"
  />
);

// @ts-expect-error Alert content must be passed as children.
const alertWithMessage = <Alert message="Message" />;

// @ts-expect-error Badge content must be passed as children.
const badgeWithMessage = <Badge message="Badge" />;

// @ts-expect-error Box does not accept arbitrary properties.
const boxWithMessage = <Box message="Message" />;

// @ts-expect-error href is not valid on the default div element.
const linkWithoutAs = <Box href="/docs" />;

// @ts-expect-error type is not valid on the default div element.
const buttonWithoutAs = <Badge type="button" />;

const modalWithOnRequestClose = (
  <Modal
    isOpen
    onDismiss={() => undefined}
    // @ts-expect-error Modal close behavior is controlled by onDismiss.
    onRequestClose={() => undefined}
  />
);

void validComponents;
void alertWithMessage;
void badgeWithMessage;
void boxWithMessage;
void linkWithoutAs;
void buttonWithoutAs;
void modalWithOnRequestClose;
void invalidInterfaceTableColumns;
void tableWithInvalidRowKey;
