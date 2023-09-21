import express from 'express';

export {BookRepositoryRouter};

class BookRepositoryRouter {
  constructor(bookController) {
    this.bookController = bookController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/repository').get(this.bookController.getBooks);
    router.route('/repository/:isbn(\\d+)').get(this.bookController.getBook);
    router.route('/repository').post(this.bookController.addBook);
    router.route('/repository/:isbn(\\d+)').delete(this.bookController.deleteBook);
    return router;
  }
}