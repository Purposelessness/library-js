/*
Create request to /book/repository and render the response in the table.
/book/repository returns a JSON array of books type of Book.
Handle errors.
Request should be sent when the page is loaded asynchronically.
 */

import {reviver} from '../utility/json.js';

const bookTable = document.getElementById('book-table');

const bookRepositoryUrl = '/book/repository';
const bookRepositoryRequest = new XMLHttpRequest();
bookRepositoryRequest.open('GET', bookRepositoryUrl);
bookRepositoryRequest.responseType = 'json';
bookRepositoryRequest.onload = () => {
  const books_json = bookRepositoryRequest.response;
  console.log(books_json);
  if (books_json === null || Object.keys(books_json).length === 0) {
    console.info('Library is empty');
    return;
  }
  const books = new Map(books_json);
  if (books) {
    console.log(books);
    for (const book of books.values()) {
      const row = bookTable.insertRow();
      row.insertCell().innerText = book.title;
      row.insertCell().innerText = book.author;
      row.insertCell().innerText = book.year;
    }
  } else {
    console.error('Json parse error');
  }
};
bookRepositoryRequest.onerror = () => {
  console.error('Error while getting books from repository');
};
bookRepositoryRequest.send();
