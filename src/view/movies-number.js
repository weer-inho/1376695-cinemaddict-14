import {createElement} from '../utils/util.js';

const createMoviesNumberTemplate = (length) => {
  return `<p>${length} movies inside</p>`;
};

export default class MoviesNumber {
  constructor(length) {
    this._length = length;
    this._element = null;
  }

  getTemplate() {
    return createMoviesNumberTemplate(this._length);
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
