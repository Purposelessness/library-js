export default class TableService {
  constructor(document) {
    this.bookTable = document.getElementById('book-table');
  }

  renderTable = (books) => {
    for (const book of books.values()) {
      const row = this.bookTable.insertRow();
      row.insertCell().innerText = book.title;
      row.insertCell().innerText = book.author;
      row.insertCell().innerText = book.year;
    }
  };
}