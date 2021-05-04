import AbstractView from './abstract.js';

const createMoviesNumberTemplate = (length) => {
  return `<p>${length} movies inside</p>`;
};

export default class MoviesNumber extends AbstractView {
  constructor(length) {
    super();
    this._length = length;
  }

  getTemplate() {
    return createMoviesNumberTemplate(this._length);
  }
}
