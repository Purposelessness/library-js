export {BookRepository};

import fs from 'fs';

class BookRepository {
  static filename = 'book_repository.json';

  constructor() {
    this.load();
  }

  add = (book) => {
    this.data.set(book.isbn, book);
    return book;
  };

  get = (isbn) => {
    return this.data.get(isbn);
  };

  getAll = () => {
    return [...this.data.values()];
  };

  delete = (isbn) => {
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
      this.data = new Map(JSON.parse(buf.toString()));
    });
  };

  toJson = () => {
    return JSON.stringify([...this.data]);
  }
}