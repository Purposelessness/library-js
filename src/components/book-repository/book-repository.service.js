import fs from 'fs';
import path from 'path';

import {__dirname} from '../../config.js';
import {Book} from './book-repository.entities.js';
import {Error} from '../utilities/error.js';
import {filterBooks, sortBooks} from '../utilities/book-helper.js';

export {BookRepository};

class BookRepository {
  static filename = path.join(__dirname, 'data/book-repository.json');
  static isbn = 0;

  constructor() {
    this.load();
  }

  add = (book) => {
    if (typeof book !== 'object' || !(book instanceof Book)) {
      throw new Error(500, 'Book is not an object or not an instance of Book');
    }
    if (!book.isValid()) {
      throw new Error(400, 'Invalid request body');
    }

    book.isbn = BookRepository.isbn++;
    this.data.set(book.isbn, book);
    console.log(`[BookRepository] Book added: ${book.title}`);
    return book;
  };

  edit = (isbn, book) => {
    if (typeof isbn !== 'number') {
      throw new Error(500, 'ISBN is not a number');
    }
    if (typeof book !== 'object' || !(book instanceof Book)) {
      throw new Error(500, 'Book is not an object or not an instance of Book');
    }
    if (!book.isValid()) {
      throw new Error(400, 'Invalid request body');
    }
    if (!this.data.has(isbn)) {
      throw new Error(404, `Book with ISBN ${isbn} is not found`);
    }

    book.isbn = isbn;
    this.data.set(isbn, book);
    console.log(`[BookRepository] Book edited: ${book.title}`);
    return book;
  };

  getAll = (filterKey = null, sortKey = null, sortDirection = null) => {
    let books = [...this.data.values()];

    // Filter books
    if (filterKey) {
      try {
        books = filterBooks(books, filterKey);
        console.log(
            `[BookRepository] Books filtered by ${filterKey}: ${books}`);
      } catch (err) {
        throw new Error(400, err.message);
      }
    }

    // Sort books
    if (sortKey && sortDirection) {
      if (typeof sortKey !== 'string' || typeof sortDirection !== 'string') {
        throw new Error(500,
            `Sort key or sort direction is not a string: ${sortKey}, ${sortDirection}`);
      }
      try {
        books = sortBooks(books, sortKey, sortDirection);
        console.log(
            `[BookRepository] Books sorted by ${sortKey} in ${sortDirection} order: ${books}`);
      } catch (err) {
        throw new Error(400, err.message);
      }
    }

    return books;
  };

  get = (isbn) => {
    if (typeof isbn !== 'number') {
      throw new Error(500, 'ISBN is not a number');
    }
    if (!this.data.has(isbn)) {
      throw new Error(404, `Book with ISBN ${isbn} is not found`);
    }
    return this.data.get(isbn);
  };

  delete = (isbn) => {
    if (typeof isbn !== 'number') {
      throw new Error(500, 'ISBN is not a number');
    }
    if (!this.data.has(isbn)) {
      throw new Error(404, `Book with ISBN ${isbn} is not found`);
    }
    this.data.delete(isbn);
  };

  save = () => {
    const data_json = this.toJson();
    fs.writeFile(BookRepository.filename, data_json, (err) => {
      if (err) {
        console.warn(`[BookRepository] Error when loading data: ${err}`);
        throw err;
      }
      console.info('[BookRepository] Data saved');
    });
  };

  load = () => {
    if (!fs.existsSync(BookRepository.filename)) {
      console.warn(
          `[BookRepository] Data file ${BookRepository.filename} is not found`);
      this.data = new Map();
      return;
    }
    fs.readFile(BookRepository.filename, (err, buf) => {
      if (err) {
        console.warn(`[BookRepository] Error when loading data: ${err}`);
        throw err;
      }
      this.data = new Map();
      const booksArray = JSON.parse(buf.toString());
      BookRepository.isbn = booksArray.length;

      for (const bookObj of booksArray) {
        const book = Book.fromObject(bookObj);
        this.data.set(book.isbn, book);
      }
      console.info('[BookRepository] Data loaded');
    });
  };

  editReader = (isbn, reader) => {
    if (typeof isbn !== 'number') {
      throw new Error(500, 'ISBN is not a number');
    }
    if (typeof reader !== 'object') {
      throw new Error(500, 'Reader is not an object');
    }
    if (!this.data.has(isbn)) {
      throw new Error(404, `Book with ISBN ${isbn} is not found`);
    }
    if (!reader.name || !reader.dueDate) {
      throw new Error(400, 'Invalid request body');
    }

    const book = this.data.get(isbn);
    book.reader = reader;
    this.data.set(isbn, book);
    console.log(`[BookRepository] Book reader edited: ${book.title}`);
    return book;
  };

  deleteReader = (isbn) => {
    if (typeof isbn !== 'number') {
      throw new Error(500, 'ISBN is not a number');
    }
    if (!this.data.has(isbn)) {
      throw new Error(404, `Book with ISBN ${isbn} is not found`);
    }

    const book = this.data.get(isbn);
    book.reader = null;
    this.data.set(isbn, book);
    console.log(`[BookRepository] Book reader deleted: ${book.title}`);
    return book;
  };

  toJson = () => {
    return JSON.stringify([...this.data.values()]);
  }
}