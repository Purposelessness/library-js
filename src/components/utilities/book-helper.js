export {sortBooks, filterBooks, BOOK_SORT_KEYS, SORT_DIRECTIONS, FILTER_KEYS};

const BOOK_SORT_KEYS = ['title', 'author', 'year'];
const SORT_DIRECTIONS = ['asc', 'desc'];

const FILTER_KEYS = ['available', 'unavailable', 'overdue', 'non-overdue'];

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
  if (!FILTER_KEYS.includes(filterKey)) {
    throw new Error(`Invalid filter key: ${filterKey}`);
  }
  return books.filter((book) => {
    switch (filterKey) {
      case 'available':
        return book.isAvailable();
      case 'unavailable':
        return !book.isAvailable();
      case 'overdue':
        return !book.isAvailable() && book.isOverdue();
      case 'non-overdue':
        return !book.isAvailable() && !book.isOverdue();
    }
  });
}