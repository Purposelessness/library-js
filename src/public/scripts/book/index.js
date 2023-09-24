import BookFormController from './controllers/book-form-controller.js';
import TableController from './controllers/table-controller.js';
import WebService from './web-service.js';

const webService = new WebService();

const tableController = new TableController(webService);
const addBookFormController = new BookFormController(
    'add', async (entries) => {
      const book = {
        title: entries['book-title'],
        author: entries['book-author'],
        year: entries['book-year'],
      };
      await webService.addBookToRepository(book,
          () => { console.log('Add book form is submitted'); }, console.error);
    });
// const filterBookFormController = new BookFormController(
//     'filter', async (book, onSuccess, onError) => {
//       await webService.getBooksFromRepository(onSuccess, onError,
//     });

const _ = tableController.renderTableAsync();
