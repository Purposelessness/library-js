import BookFormController from './book-form-controller.js';

export default class DetailsController {
  constructor(webService) {
    this.isbn = document.getElementById('isbn').innerText;
    document.getElementById('isbn').remove();

    this.deleteBookButton = document.getElementById('delete-book-button');
    this.deleteBookDialog = document.getElementById('delete-book-dialog');
    this.deleteBookConfirmButton = document.getElementById(
        'delete-book-confirm-button');
    this.deleteBookCancelButton = document.getElementById(
        'delete-book-cancel-button');

    this.editBookFormController = new BookFormController(
        'edit', async (entries) => {
          await this.onEditBookFormSubmitted(entries);
          await this.loadDetailsAsync();
        });
    this.changeBookReaderFormController = new BookFormController(
        'reader', async (entries) => {
          await this.onEditBookReaderFormSubmitted(entries);
          await this.loadDetailsAsync();
          return true;
        }, async () => {
          await this.onDeleteBookReaderButtonClicked();
          await this.loadDetailsAsync();
        });
    this.deleteBookFormController = new BookFormController(
        'delete', async () => {
          await this.onDeleteBookButtonClicked();
          return true;
        });

    this.webService = webService;
  }

  onDeleteBookButtonClicked = async () => {
    await this.webService.deleteBookFromRepository(this.isbn,
        () => {
          console.log('Book successfully deleted');
          window.location.href = '/book';
        }, console.error);
  };

  onEditBookFormSubmitted = async (entries) => {
    const book = {
      title: entries['book-title'],
      author: entries['book-author'],
      year: entries['book-year'],
    };
    await this.webService.editBookInRepository(this.isbn, book,
        () => { console.log('Edit book form is submitted'); },
        console.error);
  };

  onEditBookReaderFormSubmitted = async (entries) => {
    const reader = {
      name: entries['book-reader-name'],
      dueDate: entries['book-reader-date'],
    };
    await this.webService.editBookReaderInRepository(this.isbn, reader,
        () => { console.log('Edit book reader form is submitted'); },
        console.error);
  };

  onDeleteBookReaderButtonClicked = async () => {
    await this.webService.deleteBookReaderFromRepository(this.isbn,
        () => { console.log('Delete book reader button is clicked'); },
        console.error);
  };

  loadDetailsAsync() {
    const onSuccess = (book) => {
      const bookTitle = book.title;
      const bookAuthor = book.author;
      const bookYear = book.year;

      document.getElementById('book-title').innerText = bookTitle;
      document.getElementById('book-author').innerText = bookAuthor;
      document.getElementById('book-year').innerText = bookYear;
      // document.getElementById('book-image').value = book.image;

      const form = this.editBookFormController.form;
      form.querySelector('input[name="book-title"]').value = bookTitle;
      form.querySelector('input[name="book-author"]').value = bookAuthor;
      form.querySelector('input[name="book-year"]').value = bookYear;

      const readerForm = this.changeBookReaderFormController.form;
      if (book.reader) {
        readerForm.querySelector('input[name="book-reader-name"]').value =
            book.reader.name;
        readerForm.querySelector('input[name="book-reader-date"]').value =
            book.reader.dueDate;
      } else {
        readerForm.querySelector('input[name="book-reader-name"]').value = '';
        readerForm.querySelector('input[name="book-reader-date"]').value = '';
      }
    };

    return this.webService.getBookFromRepository(this.isbn, onSuccess,
        console.error);
  }
}