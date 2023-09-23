import {removeQueryParams} from '../utilities/url.js';

export default class AddBookFormController {
  constructor(webService) {
    this.popupContainer = document.getElementById('add-book-popup-container');
    this.form = document.getElementById('add-book-form');

    this.titleInput = document.getElementById('add-book-title');
    this.authorInput = document.getElementById('add-book-author');
    this.yearInput = document.getElementById('add-book-year');

    this.showPopupButton = document.getElementById(
        'show-add-book-popup-button');
    this.closePopupButton = document.getElementById(
        'close-add-book-popup-button');

    this.webService = webService;

    this.addListeners();
  }

  addListeners() {
    this.form.addEventListener('submit', async () => {
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      const year = this.yearInput.value;
      const book = {
        title: title, author: author, year: year,
      };
      await this.webService.addBookToRepository(book, async () => {
        console.log('Book is added');
      }, console.error);
      location.href = removeQueryParams(location.href);
    });

    this.showPopupButton.addEventListener('click', () => {
      this.popupContainer.classList.remove('hidden');
    });
    this.closePopupButton.addEventListener('click', () => {
      this.closePopup();
    });
  }

  closePopup() {
    this.popupContainer.classList.add('hidden');
  }
}