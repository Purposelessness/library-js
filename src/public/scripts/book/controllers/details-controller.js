import BookFormController from './book-form-controller.js';

export default class DetailsController {
  constructor(webService) {
    this.isbn = document.getElementById('isbn').innerText;
    document.getElementById('isbn').remove();

    this.deleteBookButton = document.getElementById('delete-book-button');
    this.editBookFormController = new BookFormController(
        'edit', async (entries) => {
          await this.onEditBookFormSubmit(entries);
          await this.loadDetailsAsync();
        });

    this.deleteBookButton.addEventListener('click', async () => {
      await webService.deleteBookFromRepository(this.isbn,
          () => {
            console.log('Book successfully deleted');
            window.location.href = '/book';
          }, console.error);
    });

    this.webService = webService;
  }

  onEditBookFormSubmit = async (entries) => {
    const book = {
      title: entries['book-title'],
      author: entries['book-author'],
      year: entries['book-year'],
    };
    await this.webService.editBookInRepository(this.isbn, book,
        () => { console.log('Edit book form is submitted'); },
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
    };

    return this.webService.getBookFromRepository(this.isbn, onSuccess,
        console.error);
  }
}