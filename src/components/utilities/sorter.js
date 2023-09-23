export {sortBooks, BOOK_SORT_KEYS, SORT_DIRECTIONS};

const BOOK_SORT_KEYS = ['title', 'author', 'year'];
const SORT_DIRECTIONS = ['asc', 'desc'];

function sortBooks(books, sortKey, sortDirection) {
  if (!BOOK_SORT_KEYS.includes(sortKey)) {
    throw new Error(`Invalid sort key: ${sortKey}`);
  }
  if (!SORT_DIRECTIONS.includes(sortDirection)) {
    throw new Error(`Invalid sort direction: ${sortDirection}`);
  }
  // Return sorted array of books typeof Book
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