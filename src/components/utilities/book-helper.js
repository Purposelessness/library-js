export {sortBooks, filterBooks, BOOK_SORT_KEYS, SORT_DIRECTIONS, FILTER_KEYS};

const BOOK_SORT_KEYS = ['title', 'author', 'year'];
const SORT_DIRECTIONS = ['asc', 'desc'];

const FILTER_KEYS = ['available', 'unavailable', 'overdue', 'non-overdue'];
const FILTER_MAP = {
  'available': (book) => book.isAvailable(),
  'unavailable': (book) => !book.isAvailable(),
  'overdue': (book) => !book.isAvailable() && book.isOverdue(),
  'non-overdue': (book) => !book.isAvailable() && !book.isOverdue(),
};

function sortBooks(books, sortKey, sortDirection) {
  if (!BOOK_SORT_KEYS.includes(sortKey)) {
    throw new Error(`Invalid sort key: ${sortKey}`);
  }
  if (!SORT_DIRECTIONS.includes(sortDirection)) {
    throw new Error(`Invalid sort direction: ${sortDirection}`);
  }
  return books.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function filterBooks(books, filterKey) {
  const filterFunctions = [];
  for (const key of filterKey) {
    if (!FILTER_KEYS.includes(key)) {
      throw new Error(`Invalid filter key: ${key}`);
    }
    filterFunctions.push(FILTER_MAP[key]);
  }
  return books.filter((book) => {
    return filterFunctions.some((filterFunction) => filterFunction(book));
  });
}