import express from 'express';

export {BookRepositoryRouter};

class BookRepositoryRouter {
  constructor(bookController) {
    this.bookController = bookController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/').get(this.bookController.getBooks);
    router.route('/:isbn(\\d+)').get(this.bookController.getBook);
    router.route('/').post(this.bookController.addBook);
    router.route('/:isbn(\\d+)').put(this.bookController.editBook);
    router.route('/:isbn(\\d+)').delete(this.bookController.deleteBook);
    router.route('/save').post(this.bookController.saveBooks);
    return router;
  }
}