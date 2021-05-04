import AbstractView from './abstract.js';

export const createNavMenuTemplate = (cards) => {
  const watchlistCount = cards.filter((card) => card.isWatchlist).length;
  const watchedCount = cards.filter((card) => card.isWatched).length;
  const favoriteCount = cards.filter((card) => card.isFavorite).length;

  return `<nav class="main-navigation">
          <div class="main-navigation__items">
            <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
            <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
            <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCount}</span></a>
            <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
          </div>
          <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createNavMenuTemplate(this._cards);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
