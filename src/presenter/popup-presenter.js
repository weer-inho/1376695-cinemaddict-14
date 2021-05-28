import PopupView from '../view/popup.js';
import {render} from '../utils/render.js';

export default class Popup {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._popupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(card) {
    this._card = card;

    if (this._container.querySelector('.film-details')) {
      this._container.querySelector('.film-details').remove();
    }

    this._popupComponent = new PopupView(this._card);
    this._popupComponent.setCloseButtonHandler(this._closePopup);
    this._popupComponent.setFavoriteButtonHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchedButtonHandler(this._handleWatchedClick);
    this._popupComponent.setWatchlistButtonHandler(this._handleWatchlistClick);
    this._popupComponent.setEmojiButtonHandler((value) => this._popupComponent.updatedData(value));

    render(this._container, this._popupComponent);
    this._container.classList.add('hide-overflow');

    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _handleFavoriteClick() {
    const currentCard = this._card;
    const changed = ({...currentCard, isFavorite: !currentCard.isFavorite});
    this._card = changed;
    this._changeData(changed);
  }

  _handleWatchedClick() {
    const currentCard = this._card;
    const changed = ({...currentCard, isWatched: !currentCard.isWatched});
    this._card = changed;
    this._changeData(changed);
  }

  _handleWatchlistClick() {
    const currentCard = this._card;
    const changed = ({...currentCard, isWatchlist: !currentCard.isWatchlist});
    this._card = changed;
    this._changeData(changed);
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _closePopup() {
    this._container.querySelector('.film-details').remove();
    this._popupComponent.removeElement();
    this._container.classList.remove('hide-overflow');
  }
}

