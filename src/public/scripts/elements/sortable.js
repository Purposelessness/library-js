const SORT_STATES = ['none', 'asc', 'desc'];
const SORT_ICON_STATES = {
  'none': 'fa-sort',
  'asc': 'fa-sort-up',
  'desc': 'fa-sort-down',
};

export default class Sortable {
  constructor(id) {
    this.element = document.getElementById(id);
    this.key = this.element.getAttribute('data-sort');

    this.state = 0;

    this.createOnSortListener(document);
    this.element.addEventListener('click', this.toggleSort);
  }

  createOnSortListener() {
    document.addEventListener('sort', async (event) => {
      if (event.detail.key === this.key) {
        return;
      }
      this.resetSort();
    });
  }

  icon() {
    return this.element.querySelector('.sort-icon');
  }

  updateIcon() {
    this.icon().classList.remove(SORT_ICON_STATES[SORT_STATES[this.state]]);
    this.state = (this.state + 1) % SORT_STATES.length;
    this.icon().classList.add(SORT_ICON_STATES[SORT_STATES[this.state]]);
  };

  resetSort() {
    this.icon().classList.remove(SORT_ICON_STATES[SORT_STATES[this.state]]);
    this.state = 0;
    this.icon().classList.add(SORT_ICON_STATES[SORT_STATES[this.state]]);
  }

  toggleSort = () => {
    this.updateIcon();
    this.element.dispatchEvent(new CustomEvent('sort', {
      bubbles: true,
      detail: {
        key: this.key,
        direction: SORT_STATES[this.state],
      },
    }));
  };
}