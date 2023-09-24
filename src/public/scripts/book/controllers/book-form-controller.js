export default class BookFormController {
  constructor(prefix, onSubmit) {
    this.popupContainer = document.getElementById(`${prefix}-popup-container`);
    this.form = this.popupContainer.querySelector('.popup-form');

    this.formTitle = this.popupContainer.querySelector('.popup-form-title');

    this.showPopupButton = document.getElementById(
        `${prefix}-show-popup-button`);
    this.closePopupButton = this.popupContainer.querySelector(
        '.form-button.cancel');

    this.addListeners(onSubmit);
  }

  addListeners(onSubmit) {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
      await onSubmit(entries);
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