import {createElement} from '../utils/util.js';

export const createCardTemplate = (card) => {
  const {id, title, ratio, year, duration, genres, poster, description, comments, isWatchlist, isFavorite, isWatched} = card;
  const watchListClass = isWatchlist !== false
    ? 'film-card__controls-item--active'
    : ' ';
  const favoriteClass = isFavorite !== false
    ? 'film-card__controls-item--active'
    : ' ';

  const watchedClass = isWatched !== false
    ? 'film-card__controls-item--active'
    : ' ';

  return `<article class="film-card" data-id="${id}">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${ratio}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClass}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClass}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
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
