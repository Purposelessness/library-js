import BookFormController from './book-form-controller.js';

export default class DetailsController {
  constructor(webService) {
    this.isbn = document.getElementById('isbn').innerText;
    document.getElementById('isbn').remove();

    this.deleteBookButton = document.getElementById('delete-book-button');
    this.editBookFormController = new BookFormController(
        async (book, onSuccess, onError) => {
          await webService.editBookInRepository(this.isbn, book, onSuccess,
              onError);
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

  loadDetailsAsync() {
    const onSuccess = (book) => {
      const bookTitle = book.title;
      const bookAuthor = book.author;
      const bookYear = book.year;

      document.getElementById('book-title').innerText = bookTitle;
      document.getElementById('book-author').innerText = bookAuthor;
      document.getElementById('book-year').innerText = bookYear;
      // document.getElementById('book-image').value = book.image;
      this.editBookFormController.setBookData(book);
    };

    return this.webService.getBookFromRepository(this.isbn, onSuccess,
        console.error);
  }
}