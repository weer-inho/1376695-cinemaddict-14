import {createElement} from '../utils/util.js';

const createEmptyList = () => {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
};

export default class NoCards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
