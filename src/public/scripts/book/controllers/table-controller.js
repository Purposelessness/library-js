import Sortable from '../../elements/sortable.js';

export default class TableController {
  constructor(webService) {
    this.bookTable = document.getElementById('book-table');

    this.sortables = this.createSortables();

    this.filterKey = null;
    this.sortKey = null;
    this.sortDirection = null;
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
      this.setSortingOptions(event.detail.key, event.detail.direction);
      await this.renderTableAsync();
    });
  }

  setSortingOptions(sortKey, sortDirection) {
    if (sortDirection === 'none') {
      sortKey = null;
      sortDirection = null;
    }
    this.sortKey = sortKey;
    this.sortDirection = sortDirection;
  }

  clearTable() {
    while (this.bookTable.rows.length > 1) {
      this.bookTable.deleteRow(1);
    }
  }

  async renderTableAsync() {
    if (this.sortKey && this.sortDirection) {
      console.log(`Sorting by ${this.sortKey} in ${this.sortDirection}`);
    }

    const fillTable = (books) => {
      this.clearTable();
      for (const book of books.values()) {
        const row = this.bookTable.insertRow();

        const titleLink = document.createElement('a');
        titleLink.href = `/book/${book.isbn}`;
        titleLink.innerText = book.title;
        row.insertCell().appendChild(titleLink);

        row.insertCell().innerText = book.author;
        row.insertCell().innerText = book.year;
        row.insertCell().innerText = book.reader ? book.reader.dueDate : '';
      }
    };
    await this.webService.getBooksFromRepository(fillTable, console.error,
        this.filterKey, this.sortKey, this.sortDirection);
  }

  async rerenderTableAsync() {
    this.clearTable();
    await this.renderTableAsync();
  }
}