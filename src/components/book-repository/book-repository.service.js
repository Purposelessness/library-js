import fs from 'fs';
import path from 'path';

import {__dirname} from '../../config.js';
import {Book} from './book-repository.entities.js';
import {Error} from '../utilities/error.js';
import {replacer, reviver} from '../utilities/json.js';

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

    this.data.set(BookRepository.isbn++, book);
    console.log(`[BookRepository] Book added: ${book.title}`);
    return book;
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

  getAll = () => {
    return [...this.data.values()];
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
      console.info('[BookRepository] Data loaded');
      this.data = new Map(JSON.parse(buf.toString(), reviver));
      BookRepository.isbn = this.data.size;
    });
  };

  toJson = () => {
    return JSON.stringify([...this.data], replacer);
  }
}