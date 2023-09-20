import {Book} from './book-repositody.entities.js';

export {BookRepositoryController};

class BookRepositoryController {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  getBooks = async (req, res, next) => {
    try {
      res.status(200).send(await this.bookRepository.getAll());
    } catch (err) {
      console.error(`[BookRepository][Controller] Error while getting books: `,
          err.message);
      next(err);
    }
  };

  getBook = async (req, res, next) => {
    try {
      const isbn = req.params.isbn;
      res.status(200).send(await this.bookRepository.get(isbn));
    } catch (err) {
      console.error(`[BookRepository][Controller] Error while getting book: `,
          err.message);
      next(err);
    }
  };

  addBook = async (req, res, next) => {
    try {
      const book = new Book(req.body.title, req.body.author, req.body.year);
      res.status(201).send(await this.bookRepository.add(book));
    } catch (err) {
      console.error(`[BookRepository][Controller] Error while adding book: `,
          err.message);
      next(err);
    }
  };
}