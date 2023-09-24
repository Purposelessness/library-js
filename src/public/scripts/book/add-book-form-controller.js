import {removeQueryParams} from '../utilities/url.js';

export default class AddBookFormController {
  constructor(webService, formTitle = null) {
    this.popupContainer = document.getElementById('popup-container');
    this.form = document.getElementById('popup-form');
    this.formTitle = document.getElementById('form-title');

    this.titleInput = document.getElementById('form-book-title');
    this.authorInput = document.getElementById('form-book-author');
    this.yearInput = document.getElementById('form-book-year');

    this.showPopupButton = document.getElementById(
        'show-popup-button');
    this.closePopupButton = document.getElementById(
        'close-popup-button');

    this.webService = webService;

    this.addListeners();

    if (formTitle !== null) {
      this.formTitle.innerText = formTitle;
    }
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