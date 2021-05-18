import NavMenuView from '../view/nav-menu.js';
import NoCardsView from '../view/list-empty.js';
import SortMenuView from '../view/sort-menu.js';
import SectionFilmsView from '../view/section-films.js';
import FilmsListView from '../view/films-list.js';
import {sortCards} from '../view/sorting.js';
import {navigateCards} from '../view/navigating.js';
import {render} from '../utils/render.js';
import CardPresenter from '../presenter/card-presenter.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import PopupView from '../view/popup.js';
import {updateItem} from '../utils/common.js';

export default class MainPresenter {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;

    this._emptyFilmsListComponent = new NoCardsView();
    this._sortComponent = new SortMenuView();
    this._sectionFilmsComponent = new SectionFilmsView();
    this._sectionFilmsListComponent = new FilmsListView();
    this._buttonComponent = null;
    this._cardPresenter = {};

    this._handleCardChange = this._handleCardChange.bind(this);
    this._popupStatus = false;
  }

  init(cards) {
    this._cards = cards.slice();

    this._MOVIES_PER_STEP = 5;
    this._renderNav(this._cards);
    this._renderBoard();
    this._sectionFilms = this._mainContainer.querySelector('.films');
    this._mainContainers = document.querySelector('.films-list__container');
    this.renderCards(this._cards, this._mainContainers, this._sectionFilms);
    this._sortMenu();
    this._navMenu();
    this._renderPopup();
  }

  _renderNav(cards) {
    this._navComponent = new NavMenuView(cards);
    render(this._mainContainer, this._navComponent);
  }

  _renderBoard() {
    if (this._cards.length === 0) {
      this._renderEmptyFilmsList();
    } else {
      this._renderSort();
      this._renderSectionFilms();
      this._sectionFilms = this._mainContainer.querySelector('.films');
      render(this._sectionFilms, this._sectionFilmsListComponent);
      this._mainContainers = this._sectionFilms.querySelector('.films-list__container');
    }
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
  }

  _renderEmptyFilmsList() {
    render(this._mainContainer, this._emptyFilmsListComponent);
  }

  _renderSectionFilms() {
    render(this._mainContainer, this._sectionFilmsComponent);
  }

  _handleCardChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard);
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._mainContainers, this._handleCardChange);
    cardPresenter.init(card);
    this._cardPresenter[card.id] = cardPresenter;
  }

  _clearTaskList(container) {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    container.innerText = '';
  }

  renderCards(films, container, wrapper) {
    this._clearTaskList(container);

    const limit = Math.min(films.length, this._MOVIES_PER_STEP);

    for (let i = 0; i < limit; i++) {
      this._renderCard(films[i]);
    }

    if (films.length > this._MOVIES_PER_STEP) {
      let renderTemplatedCardCount = this._MOVIES_PER_STEP;

      if (!this._mainContainer.querySelector('.films-list__show-more')) {
        this._buttonComponent = new ShowMoreButtonView();
        render(wrapper, this._buttonComponent);

        const loadMoreButton = wrapper.querySelector('.films-list__show-more');

        this._buttonComponent.setButtonShowMore(() => {
          films
            .slice(renderTemplatedCardCount, renderTemplatedCardCount + this._MOVIES_PER_STEP)
            .forEach((card) => this._renderCard(card));

          renderTemplatedCardCount += this._MOVIES_PER_STEP;

          if (renderTemplatedCardCount >= films.length) {
            loadMoreButton.remove();
          }
        });
      }
    }
  }

  _sortMenu() {
    this._sortComponent.setClickHandler((evt) => {
      if (evt.target.tagName !== 'A') {
        return;
      }

      this.renderCards(
        sortCards(evt, this._cards),
        this._mainContainers,
        this._sectionFilms,
      );
    });
  }

  _navMenu() {
    this._navComponent.setClickHandler((evt) => {
      if (evt.target.tagName !== 'A') {
        return;
      }

      this.renderCards(
        navigateCards(evt, this._cards),
        this._mainContainers,
        this._sectionFilms,
      );
    });
  }

  _renderPopup() {
    const cardsListHandler = (evt) => {
      evt.preventDefault();
      const pageBody = document.querySelector('body');
      const target = evt.target;
      const isTargetCorrect = target.classList.contains('film-card__title')
        || target.classList.contains('film-card__poster')
        || target.classList.contains('film-card__comments');
      if (!isTargetCorrect) {
        return false;
      }

      if (this._popupStatus === true) {
        pageBody.querySelector('.film-details').remove();
      }

      const cardId = target.closest('.film-card').dataset.id;
      const card = this._cards.find((card) => cardId === card.id);
      const cardComponent = new PopupView(card);
      const cardElement = cardComponent.getElement();
      render(pageBody, cardElement);
      this._popupStatus = true;
      pageBody.classList.add('hide-overflow');

      const closePopup = () => {
        cardElement.remove();
        cardComponent.removeElement();
        pageBody.classList.remove('hide-overflow');
        this._popupStatus = false;
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          closePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      document.addEventListener('keydown', onEscKeyDown);
      cardComponent.setCloseButtonHandler(() => {
        closePopup();
      });
      cardComponent.setFavoriteButtonHandler(() => this._handleCardChange({...card, isFavorite: !card.isFavorite}));
      cardComponent.setWatchedButtonHandler(() => this._handleCardChange({...card, isWatched: !card.isWatched}));
      cardComponent.setWatchlistButtonHandler(() => this._handleCardChange({...card, isWatchlist: !card.isWatchlist}));
    };

    this._sectionFilmsListComponent.setClickHandler((evt) => cardsListHandler(evt));
  }
}
