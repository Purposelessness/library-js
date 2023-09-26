export default class BookFormController {
  constructor(prefix, onSubmit, onCancel = null) {
    this.popupContainer = document.getElementById(`${prefix}-popup-container`);
    this.form = this.popupContainer.querySelector('.popup-form');

    this.formTitle = this.popupContainer.querySelector('.popup-form-title');

    this.showPopupButton = document.getElementById(
        `${prefix}-show-popup-button`);
    this.closePopupButton = this.popupContainer.querySelector(
        '.form-button.cancel');

    this.addListeners(onSubmit, onCancel);
  }

  extractParameters(event) {
    const form = event.target;
    const formData = new FormData(form);
    const entries = [...formData.entries()];
    let parameters = {};
    for (const [key, value] of entries) {
      if (!parameters[key]) {
        parameters[key] = [];
      }
      parameters[key].push(value);
    }
    for (const key in parameters) {
      if (parameters[key].length === 1) {
        parameters[key] = parameters[key][0];
      }
    }
    return parameters;
  }

  addListeners(onSubmit, onCancel = null) {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const parameters = this.extractParameters(e);
      let shouldClose = await onSubmit(parameters);
      if (shouldClose) {
        this.closePopup();
      }
    });

    this.showPopupButton.addEventListener('click', () => {
      this.popupContainer.classList.remove('hidden');
    });
    this.closePopupButton.addEventListener('click', async () => {
      this.closePopup();
      if (!onCancel) {
        return;
      }
      let shouldClose = await onCancel();
      if (shouldClose === undefined || shouldClose) {
        this.closePopup();
      }
    });
  }

  closePopup() {
    this.popupContainer.classList.add('hidden');
  }
}