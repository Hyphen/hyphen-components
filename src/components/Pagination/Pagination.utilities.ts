export interface Page {
  isPage: boolean;
  pageNumber: number;
}

export const generatePages = (
  pageTotal: number,
  activePage: number,
  numberOfPagesDisplayed: number
): Page[] => {
  const pageRange = Math.min(pageTotal, Math.max(1, numberOfPagesDisplayed));
  const pages: Page[] = [];
  let startingPage = 1;
  let endingPage = pageRange;

  if (activePage + Math.floor(pageRange / 2) >= pageTotal) {
    startingPage = Math.max(1, pageTotal - pageRange + 1);
    endingPage = pageTotal;
  } else {
    startingPage = Math.max(1, activePage - Math.floor(pageRange / 2));
    endingPage = Math.min(pageTotal, startingPage + pageRange - 1);
  }

  for (let i = startingPage; i <= endingPage; i += 1) {
    pages.push({ pageNumber: i, isPage: true });
  }

  // Handling ellipsis for overflow pages
  if (endingPage < pageTotal) {
    if (endingPage < pageTotal - 1) {
      pages.push({ pageNumber: -1, isPage: false }); // represents ellipsis
    }
    pages.push({ pageNumber: pageTotal, isPage: true });
  }

  if (startingPage > 1) {
    pages.unshift({ pageNumber: 1, isPage: true });
    if (startingPage > 2) {
      pages.splice(1, 0, { pageNumber: -1, isPage: false }); // represents ellipsis
    }
  }

  return pages;
};

export const generatePageTotal = (
  totalItemsCount: number,
  itemsPerPage: number
): number => Math.ceil(totalItemsCount / itemsPerPage);

// Returns the range of current items displayed based on the specific page.
// E.G: if the items per page is 20 and we are on page 1, it will return:
// { first: 1, last: 20 }
export const generateActiveListRange = (
  activePage: number,
  totalItemsCount: number,
  itemsPerPage: number
): { first: number; last: number } => {
  const first = (activePage - 1) * itemsPerPage + 1;
  const last = Math.min(activePage * itemsPerPage, totalItemsCount);

  return { first, last };
};

