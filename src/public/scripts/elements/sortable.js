const SORT_STATES = ['none', 'asc', 'desc'];
const SORT_ICON_STATES = {
  'none': 'fa-sort',
  'asc': 'fa-sort-up',
  'desc': 'fa-sort-down',
};

export default class Sortable {
  constructor(id) {
    this.element = document.getElementById(id);
    this.field = this.element.getAttribute('data-sort');

    this.state = 0;

    this.element.addEventListener('click', this.toggleSort);
  }

  icon() {
    return this.element.querySelector('.sort-icon');
  }

  updateIcon() {
    this.icon().classList.remove(SORT_ICON_STATES[SORT_STATES[this.state]]);
    this.state = (this.state + 1) % SORT_STATES.length;
    this.icon().classList.add(SORT_ICON_STATES[SORT_STATES[this.state]]);
  };

  toggleSort = () => {
    this.updateIcon();
    this.element.dispatchEvent(new CustomEvent('sort', {
      bubbles: true,
      detail: {
        field: this.field,
        direction: SORT_STATES[this.state],
      },
    }));
  };
}