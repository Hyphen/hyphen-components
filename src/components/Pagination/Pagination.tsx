import React, { FC, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import {
  generatePages,
  generatePageTotal,
  generateActiveListRange,
} from './Pagination.utilities';

export interface PaginationProps {
  /**
   * The current page number being displayed.
   */
  activePage: number;
  /**
   * The number of list items contained in a page.
   */
  itemsPerPage: number;
  /**
   * Callback fired when the user clicks a page or prev/next button.
   */
  onChange: (pageNumber: number) => void;
  /**
   * The total number of items in the list
   */
  totalItemsCount: number;
  /**
   * Boolean to determine if individual page buttons (or dropdown are visible). Takes a `ResponsiveProp`
   * if you want to render it differently at different breakpoints
   */
  arePagesVisible?: boolean;
  /**
   * Custom class to pass down to the pagination container.
   */
  className?: string;
  /**
   * Pass true to render a version of Pagination with smaller buttons.
   */
  isCompact?: boolean;
  /**
   * Boolean to determine if the list totals (and current range) are visible.
   * NOTE: these are hidden on mobile regardless of this prop value.
   */
  isTotalVisible?: boolean;
  /**
   * The text (or react node) to pass to the NEXT page button.
   */
  nextPageText?: string | ReactNode;
  /**
   * Number of pages shown in paginator, not including navigation blocks (prev, next), as well as first, last pages.
   * In other words the number of pages displayed 'in the middle', that the user can navigate to.
   */
  numberOfPagesDisplayed?: number;
  /**
   * The text (or react node) to pass to the PREVIOUS page button.
   */
  prevPageText?: string | ReactNode;
}

export const Pagination: FC<PaginationProps> = ({
  activePage,
  itemsPerPage,
  onChange,
  totalItemsCount,
  arePagesVisible = false,
  className = undefined,
  isCompact = false,
  isTotalVisible = true,
  nextPageText = 'Next',
  numberOfPagesDisplayed = 5,
  prevPageText = 'Previous',
}) => {
  const pageTotal = useMemo(() => {
    if (itemsPerPage <= 0) return 1;
    return generatePageTotal(totalItemsCount, itemsPerPage);
  }, [totalItemsCount, itemsPerPage]);

  const validActivePage = Math.max(1, Math.min(activePage, pageTotal));

  const activeListRange = useMemo(
    () =>
      generateActiveListRange(validActivePage, totalItemsCount, itemsPerPage),
    [validActivePage, totalItemsCount, itemsPerPage]
  );

  const pages = useMemo(
    () =>
      generatePages(
        pageTotal,
        validActivePage,
        numberOfPagesDisplayed
      ),
    [pageTotal, validActivePage, numberOfPagesDisplayed]
  );

  const paginationClassNames = useMemo(
    () => classNames(className),
    [className]
  );

  const activeListRangeText = useMemo(() => {
    if (totalItemsCount === 0) {
      return 'No items to display';
    }
    return `Showing ${activeListRange.first}-${activeListRange.last} of ${totalItemsCount}`;
  }, [activeListRange, totalItemsCount]);

  return (
    <Box
      as="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={paginationClassNames}
    >
      <Box
        direction="row"
        justifyContent={{ base: 'space-between' }}
        flex={{ base: 'auto', tablet: 'none' }}
        gap={isCompact ? 'xs' : 'sm'}
      >
        <Button
          variant="secondary"
          size={isCompact ? 'sm' : 'md'}
          isDisabled={validActivePage === 1}
          onClick={() => onChange(validActivePage - 1)}
        >
          {prevPageText}
        </Button>
        {arePagesVisible && (
          <Box direction="row" gap="2xs">
            {pages.map(({ pageNumber, isPage }, index) => {
              return isPage ? (
                <Button
                  key={pageNumber}
                  onClick={() => onChange(pageNumber)}
                  variant={pageNumber === activePage ? 'secondary' : 'tertiary'}
                  size={isCompact ? 'sm' : 'md'}
                  style={{
                    minWidth: isCompact ? '33px' : '42px',
                  }}
                  className={className}
                >
                  {pageNumber}
                </Button>
              ) : (
                <Box
                  key={`ellipsis-${index}`}
                  style={{
                    display: 'flexk',
                    minWidth: isCompact ? '33px' : '42px',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  ...
                </Box>
              );
            })}
          </Box>
        )}
        <Button
          variant="secondary"
          size={isCompact ? 'sm' : 'md'}
          isDisabled={validActivePage === pageTotal}
          onClick={() => onChange(validActivePage + 1)}
        >
          {nextPageText}
        </Button>
      </Box>
      <Box
        as="p"
        display={{
          base: 'none',
          tablet: 'block',
        }}
        fontSize={isCompact ? 'sm' : 'md'}
      >
        {isTotalVisible && activeListRangeText}
      </Box>
    </Box>
  );
};
