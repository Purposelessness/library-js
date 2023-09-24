import {removeQueryParams} from '../../utilities/url.js';

export default class BookFormController {
  constructor(prefix, onSubmit) {
    this.popupContainer = document.getElementById(`${prefix}-popup-container`);
    this.form = this.popupContainer.querySelector('.popup-form');

    this.formTitle = this.popupContainer.querySelector('.popup-form-title');

    this.titleInput = document.getElementById(`${prefix}-form-book-title`);
    this.authorInput = document.getElementById(`${prefix}-form-book-author`);
    this.yearInput = document.getElementById(`${prefix}-form-book-year`);

    this.showPopupButton = document.getElementById(
        `${prefix}-show-popup-button`);
    this.closePopupButton = this.popupContainer.querySelector(
        '.form-button.cancel');

    this.addListeners(onSubmit);
  }

  addListeners(onSubmit) {
    this.form.addEventListener('submit', async () => {
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      const year = this.yearInput.value;
      const book = {
        title: title, author: author, year: year,
      };
      await onSubmit(book, () => {
        console.log('Book form is submitted');
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

  setBookData(book) {
    this.titleInput.value = book.title;
    this.authorInput.value = book.author;
    this.yearInput.value = book.year;
  }
}