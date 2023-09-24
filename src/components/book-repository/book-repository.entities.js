export {Book};

class Book {
  constructor(title, author, year) {
    this.isbn = null;
    this.title = title;
    this.author = author;
    this.year = year;
    this.reader = null;
  }

  setReader(name, date) {
    this.reader = {
      name: name,
      dueDate: date,
    };
  }

  removeReader() {
    this.reader = null;
  }

  isAvailable() {
    return this.reader === null;
  }

  isOverdue() {
    // Check if the book is overdue by comparing the due date with today's date
    const today = new Date();
    return this.reader.dueDate < today;
  }

  isValid() {
    return typeof this.title === 'string' && this.title.length > 0 &&
        typeof this.author === 'string' && this.author.length > 0 &&
        typeof this.year === 'string' && this.year.length > 0;
  }
}