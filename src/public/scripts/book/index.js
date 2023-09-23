import AddBookFormController from './add-book-form-controller.js';
import TableController from './table-controller.js';
import WebService from './web-service.js';

const webService = new WebService();

const tableController = new TableController(document, webService);
const addBookFormController = new AddBookFormController(document, webService);

const _ = tableController.renderTableAsync();
