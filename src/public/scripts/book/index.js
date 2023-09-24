import BookFormController from './controllers/book-form-controller.js';
import TableController from './controllers/table-controller.js';
import WebService from './web-service.js';

const webService = new WebService();

const tableController = new TableController(webService);
const addBookFormController = new BookFormController(
    'add', async (book, onSuccess, onError) => {
      await webService.addBookToRepository(book, onSuccess, onError);
    });

const _ = tableController.renderTableAsync();
