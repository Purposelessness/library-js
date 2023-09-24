import BookFormController from './book-form-controller.js';
import WebService from './web-service.js';

const isbn = document.getElementById('isbn').innerText;
document.getElementById('isbn').remove();

const deleteBookButton = document.getElementById('delete-book-button');

const webService = new WebService();
const editBookFormController = new BookFormController(
    async (isbn, book, onSuccess, onError) => {
      await webService.editBookInRepository(isbn, book, onSuccess, onError);
    }, 'Edit book');

deleteBookButton.addEventListener('click', async () => {
  await webService.deleteBookFromRepository(isbn,
      () => {
        console.log('Book successfully deleted');
        window.location.href = '/book';
      }, console.error);
});

const onSuccess = (book) => {
  const bookTitle = book.title;
  const bookAuthor = book.author;
  const bookYear = book.year;

  document.getElementById('book-title').innerText = bookTitle;
  document.getElementById('book-author').innerText = bookAuthor;
  document.getElementById('book-year').innerText = bookYear;
  // document.getElementById('book-image').value = book.image;
  editBookFormController.setBookData(book);
};

const _ = webService.getBookFromRepository(isbn, onSuccess, console.error);