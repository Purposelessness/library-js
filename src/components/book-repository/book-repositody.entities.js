export {Book};

class Book {
  static isbn = 0;

  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.isbn = Book.isbn++;
    this.year = year;
    this.reader = null;
  }

  setReader(name, date) {
    this.reader = {
      name: name,
      date: date,
    };
  }

  removeReader() {
    this.reader = null;
  }

  isAvailable() {
    return this.reader === null;
  }
}