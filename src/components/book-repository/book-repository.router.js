import express from 'express';

export {BookRepositoryRouter};

class BookRepositoryRouter {
  constructor(bookController) {
    this.bookController = bookController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/').get(this.bookController.getBooks);
    router.route('/:isbn').get(this.bookController.getBook);
    router.route('/').post(this.bookController.addBook);
    return router;
  }
}