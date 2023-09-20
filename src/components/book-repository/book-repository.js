import {BookRepository} from './book-repository.service.js';
import {BookRepositoryController} from './book-repository.controller.js';
import {BookRepositoryRouter} from './book-repository.router.js';

const bookRepository = new BookRepository();
const bookRepositoryController = new BookRepositoryController(bookRepository);
const bookRepositoryRouter = new BookRepositoryRouter(bookRepositoryController);

export default {
  service: bookRepository,
  controller: bookRepositoryController,
  router: bookRepositoryRouter.getRouter(),
};