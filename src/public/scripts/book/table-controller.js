import Sortable from '../elements/sortable.js';

export default class TableController {
  constructor(document, webService) {
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

  createOnSortListener(document) {
    document.addEventListener('sort', async (event) => {
      await this.sortBooksAsync(event.detail.field, event.detail.direction);
    });
  }

  async renderTableAsync() {
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

  clearTable() {
    while (this.bookTable.rows.length > 2) {
      this.bookTable.deleteRow(1);
    }
  }

  async sortBooksAsync(field, direction) {
    this.clearTable();
    console.log(`Sorting by ${field} in ${direction}`);
    const fillTable = (books) => {
      for (const book of books.values()) {
        const row = this.bookTable.insertRow();
        row.insertCell().innerText = book.title;
        row.insertCell().innerText = book.author;
        row.insertCell().innerText = book.year;
      }
    };
    await this.webService.getBooksFromRepository(fillTable, console.error,
        field, direction);
  }
}