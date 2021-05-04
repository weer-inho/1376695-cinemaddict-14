import NavMenuView from './view/nav-menu.js';
import SortMenuView from './view/sort-menu.js';
// import CardView from './view/card.js';
import SectionFilmsView from './view/section-films.js';
import UserRankView from './view/user-rank.js';
import FilmsListView from './view/films-list.js';
import MoviesNumberView from './view/movies-number.js';
import PopupView from './view/popup.js';
// import ShowMoreButtonView from './view/show-more-button.js';
import NoCardsView from './view/list-empty.js';
import {generateCard} from './mock/card.js';
import {renderElement, renderPosition} from './utils/render.js';
import {drawFilmCards} from './utils/draw-film-cards.js';
import {sortCards} from './view/sorting.js';
import {navigateCards} from './view/navigating.js';

const ALL_MOVIES = 19;
const cards = new Array(ALL_MOVIES).fill().map(generateCard);
const pageBody = document.querySelector('body');
const siteHeaderElement = pageBody.querySelector('.header');
const siteMainElement = pageBody.querySelector('.main');
const siteFooterStatElement = pageBody.querySelector('.footer__statistics');

const navMenuComponent = new NavMenuView(cards);
renderElement(siteMainElement, navMenuComponent.getElement(), renderPosition.BEFOREEND);

const sortMenuComponent = new SortMenuView();
if (cards.length === 0) {
  renderElement(siteMainElement, new NoCardsView().getElement(), renderPosition.BEFOREEND);
} else {
  renderElement(siteHeaderElement, new UserRankView().getElement(), renderPosition.BEFOREEND);
  renderElement(siteMainElement, sortMenuComponent.getElement(), renderPosition.BEFOREEND);
}

renderElement(siteMainElement, new SectionFilmsView().getElement(), renderPosition.BEFOREEND);

const sectionFilms = siteMainElement.querySelector('.films');
const filmsListComponent = new FilmsListView();
renderElement(sectionFilms, filmsListComponent.getElement(), renderPosition.BEFOREEND);
renderElement(siteFooterStatElement, new MoviesNumberView(cards.length).getElement(), renderPosition.BEFOREEND);

const filmsListContainers = document.querySelector('.films-list__container');

sortMenuComponent.setClickHandler((evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== 'A') {
    return;
  }

  sortCards(evt, cards, filmsListContainers, sectionFilms);
});

navMenuComponent.setClickHandler((evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== 'A') {
    return;
  }

  navigateCards(evt, cards, filmsListContainers, sectionFilms);
});

drawFilmCards(cards, filmsListContainers, sectionFilms);

const cardsListHandler = (evt) => {
  evt.preventDefault();
  // target = ссылка на объект,
  // на который было совершено нажатие
  const target = evt.target;
  const isTargetCorrect = target.classList.contains('film-card__title')
    || target.classList.contains('film-card__poster')
    || target.classList.contains('film-card__comments');
  if (!isTargetCorrect) {
    return false;
  }

  // id карточки на которую мы нажали
  const cardId = target.closest('.film-card').dataset.id;
  // находим в массиве карточек ту,
  // на которую было совершено нажатие
  const card = cards.find((card) => cardId === card.id);
  const cardComponent = new PopupView(card);
  const cardElement = cardComponent.getElement();
  renderElement(pageBody, cardElement, renderPosition.BEFOREEND);
  pageBody.classList.add('hide-overflow');

  const closePopup = () => {
    cardElement.remove();
    cardComponent.removeElement();
    pageBody.classList.remove('hide-overflow');
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
};

filmsListComponent.setClickHandler((evt) => cardsListHandler(evt));
