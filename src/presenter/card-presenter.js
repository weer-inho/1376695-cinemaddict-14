import CardView from '../view/card.js';
import {render, remove, replace} from '../utils/render.js';

export default class Card {
  constructor(filmsListContainer, changeData) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;

    this._cardComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(card) {
    // debugger;
    this._card = card;

    const prevCardComponent = this._cardComponent;

    this._cardComponent = new CardView(this._card);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevCardComponent === null) {
      render(this._filmsListContainer, this._cardComponent);
      return;
    }

    // проверка на наличие в DOM
    if (this._filmsListContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
  }

  _handleFavoriteClick() {
    this._changeData({...this._card, isFavorite: !this._card.isFavorite});
  }

  _handleWatchedClick() {
    this._changeData({...this._card, isWatched: !this._card.isWatched});
  }

  _handleWatchlistClick() {
    this._changeData({...this._card, isWatchlist: !this._card.isWatchlist});
  }

  destroy() {
    remove(this._cardComponent);
  }
}
