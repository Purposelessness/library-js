import AddBookFormController from './add-book-form-controller.js';
import TableService from './table-service.js';
import WebService from './web-service.js';

const webService = new WebService();

const tableService = new TableService(document);
const addBookFormController = new AddBookFormController(document, webService);

const _ = webService.getBooksFromRepository(tableService.renderTable,
    console.error);

