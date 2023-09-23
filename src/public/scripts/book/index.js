import WebService from './web-service.js';
import TableService from './table-service.js';

const bookTable = document.getElementById('book-table');

const webService = new WebService();
const tableService = new TableService(bookTable);
const _ = webService.getBooksFromRepository(tableService.renderTable,
    console.error);

const addBookPopup = document.getElementById('add-book-popup-container');

const showAddBookPopupButton = document.getElementById(
    'show-add-book-popup-button');
showAddBookPopupButton.addEventListener('click', () => {
  const addBookPopup = document.getElementById('add-book-popup-container');
  addBookPopup.classList.remove('hidden');
});

function closeAddBookPopup() {
  const addBookPopup = document.getElementById('add-book-popup-container');
  addBookPopup.classList.add('hidden');
}

const closeAddBookPopupButton = document.getElementById(
    'close-add-book-popup-button');
closeAddBookPopupButton.addEventListener('click', async () => {
  closeAddBookPopup();
});

const addBookForm = document.getElementById(
    'add-book-form');
addBookForm.addEventListener('submit', async () => {
  console.log('Submit add book popup button is clicked');
  const title = document.getElementById('add-book-title').value;
  const author = document.getElementById('add-book-author').value;
  const year = document.getElementById('add-book-year').value;
  const book = {
    title: title, author: author, year: year,
  };
  await webService.addBookToRepository(book, async () => {
    console.log('Book is added');
  }, console.error);
});
