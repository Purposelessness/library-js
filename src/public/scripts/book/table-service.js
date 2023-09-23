export default class TableService {
  constructor(bookTable) {
    this.bookTable = bookTable;
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