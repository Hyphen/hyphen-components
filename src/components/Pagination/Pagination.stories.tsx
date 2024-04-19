import { Pagination } from './Pagination';
import type { Meta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};

export default meta;

export const Default = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Pagination
        activePage={activePage}
        itemsPerPage={20}
        onChange={setActivePage}
        totalItemsCount={87}
        numberOfPagesDisplayed={0}
      />
    </>
  );
};

export const Compact = () => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Pagination
      activePage={activePage}
      itemsPerPage={20}
      onChange={setActivePage}
      totalItemsCount={100}
      isCompact
    />
  );
};

export const PageNumbers = () => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Pagination
      activePage={activePage}
      itemsPerPage={20}
      onChange={setActivePage}
      totalItemsCount={100}
      isCompact
      arePagesVisible
      numberOfPagesDisplayed={3}
    />
  );
};
