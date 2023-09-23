import Sortable from '../elements/sortable.js';

export default class TableController {
  constructor(webService) {
    this.bookTable = document.getElementById('book-table');

    this.sortables = this.createSortables();

    this.webService = webService;

    this.createOnSortListener(document);
  }

  createSortables() {
    const sortables = [];
    const sortElements = document.querySelectorAll('.sortable');
    for (const element of sortElements.values()) {
      sortables.push(new Sortable(element.id));
    }
    return sortables;
  }

  createOnSortListener() {
    document.addEventListener('sort', async (event) => {
      if (event.detail.direction === 'none') {
        await this.renderTableAsync();
      } else {
        await this.sortBooksAsync(event.detail.key, event.detail.direction);
      }
    });
  }

  clearTable() {
    while (this.bookTable.rows.length > 1) {
      this.bookTable.deleteRow(1);
    }
  }

  async renderTableAsync() {
    this.clearTable();
    const fillTable = (books) => {
      for (const book of books.values()) {
        const row = this.bookTable.insertRow();
        row.insertCell().innerText = book.title;
        row.insertCell().innerText = book.author;
        row.insertCell().innerText = book.year;
      }
    };
    await this.webService.getBooksFromRepository(fillTable, console.error);
  }

  async sortBooksAsync(key, direction) {
    this.clearTable();
    console.log(`Sorting by ${key} in ${direction}`);
    const fillTable = (books) => {
      for (const book of books.values()) {
        const row = this.bookTable.insertRow();
        row.insertCell().innerText = book.title;
        row.insertCell().innerText = book.author;
        row.insertCell().innerText = book.year;
      }
    };
    await this.webService.getBooksFromRepository(fillTable, console.error,
        key, direction);
  }
}