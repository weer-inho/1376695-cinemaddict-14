import AbstractView from './abstract.js';

const createButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class Button extends AbstractView {
  constructor() {
    super();

    this._clickButtonShowMore = this._clickButtonShowMore.bind(this);
  }

  getTemplate() {
    return createButtonTemplate();
  }

  _clickButtonShowMore(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setButtonShowMore(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickButtonShowMore);
  }
}
