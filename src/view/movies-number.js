import {createElement} from '../utils/util.js';

const createMoviesNumberTemplate = () => {
  return '<p>130 291 movies inside</p>';
};

export default class MoviesNumber {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoviesNumberTemplate();
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
