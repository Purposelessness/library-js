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
const filterBooksFormController = new BookFormController(
    'filter', async (entries) => {
      console.log(entries);
      tableController.filterKey = entries['filter-key'];
      tableController.clearTable();
      await tableController.renderTableAsync();
    });

const _ = tableController.renderTableAsync();
