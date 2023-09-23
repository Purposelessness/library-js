import WebService from './web-service.js';

const isbn = document.getElementById('isbn').innerText;
document.getElementById('isbn').remove();

const deleteBookButton = document.getElementById('delete-book-button');

const webService = new WebService();

deleteBookButton.addEventListener('click', async () => {
  await webService.deleteBookFromRepository(isbn,
      () => {
        console.log('Book successfully deleted');
        window.location.href = '/book';
      }, console.error);
});

const onSuccess = (book) => {
  document.getElementById('book-title').innerText = book.title;
  document.getElementById('book-author').innerText = book.author;
  document.getElementById('book-year').innerText = book.year;
  // document.getElementById('book-image').value = book.image;
};

const _ = webService.getBookFromRepository(isbn, onSuccess, console.error);