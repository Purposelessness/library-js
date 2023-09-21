export {Book};

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
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

  isValid() {
    return typeof this.title === 'string' && this.title.length > 0 &&
        typeof this.author === 'string' && this.author.length > 0 &&
        typeof this.year === 'string' && this.year.length > 0;
  }
}