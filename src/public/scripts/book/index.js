import AddBookFormController from './add-book-form-controller.js';
import TableController from './table-controller.js';
import WebService from './web-service.js';

const webService = new WebService();

const tableController = new TableController(webService);
const addBookFormController = new AddBookFormController(webService, 'Add book');

const _ = tableController.renderTableAsync();
