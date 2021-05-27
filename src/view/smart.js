import AbstractView from '../view/abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();

    this._data = {};
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._card = Object.assign(
      {},
      this._card,
      update
    );

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
