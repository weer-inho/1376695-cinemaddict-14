import NavMenuView from './view/nav-menu.js';
import SortMenuView from './view/sort-menu.js';
import CardView from './view/card.js';
import SectionFilmsView from './view/section-films.js';
import UserRankView from './view/user-rank.js';
import FilmsListView from './view/films-list.js';
import MoviesNumberView from './view/movies-number.js';
import PopupView from './view/popup.js';
import ShowMoreButtonView from './view/show-more-button.js';
import NoCardsView from './view/list-empty.js';
import {generateCard} from './mock/card.js';
import {renderElement, renderPosition} from './utils/util.js';
import {drawFilmCards} from './utils/draw-film-cards.js';
import {sortCards, constsForSort} from './view/sorting.js';
import {navigateCards} from './view/navigating.js';

const ALL_MOVIES = 19;
const MOVIES_PER_STEP = 5;
const cards = new Array(ALL_MOVIES).fill().map(generateCard);
const pageBody = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatElement = document.querySelector('.footer__statistics');


renderElement(siteMainElement, new NavMenuView(cards).getElement(), renderPosition.BEFOREEND);

if (cards.length === 0) {
  renderElement(siteMainElement, new NoCardsView().getElement(), renderPosition.BEFOREEND);
} else {
  renderElement(siteHeaderElement, new UserRankView().getElement(), renderPosition.BEFOREEND);
  renderElement(siteMainElement, new SortMenuView().getElement(), renderPosition.BEFOREEND);
}

renderElement(siteMainElement, new SectionFilmsView().getElement(), renderPosition.BEFOREEND);

const sectionFilms = siteMainElement.querySelector('.films');
renderElement(sectionFilms, new FilmsListView().getElement(), renderPosition.BEFOREEND);
renderElement(siteFooterStatElement, new MoviesNumberView(cards.length).getElement(), renderPosition.BEFOREEND);

const filmsListContainers = document.querySelector('.films-list__container');
const mainNavigationElement = document.querySelector('.main-navigation');

const sortElement = siteMainElement.querySelector('.sort');
sortElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== 'A') {
    return;
  }

  sortCards(evt, cards, ALL_MOVIES, filmsListContainers, drawFilmCards, constsForSort);
});

mainNavigationElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== 'A') {
    return;
  }

  navigateCards(evt, cards, ALL_MOVIES, filmsListContainers, drawFilmCards);
});

drawFilmCards(cards, Math.min(cards.length, MOVIES_PER_STEP), filmsListContainers);

if (cards.length > MOVIES_PER_STEP) {
  let renderTemplateedCardCount = MOVIES_PER_STEP;

  renderElement(sectionFilms, new ShowMoreButtonView().getElement(), renderPosition.BEFOREEND);

  const loadMoreButton = sectionFilms.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderTemplateedCardCount, renderTemplateedCardCount + MOVIES_PER_STEP)
      .forEach((card) => renderElement(filmsListContainers, new CardView(card).getElement(), renderPosition.BEFOREEND));

    renderTemplateedCardCount += MOVIES_PER_STEP;

    if (renderTemplateedCardCount >= cards.length) {
      loadMoreButton.remove();
    }
  });
}

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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      cardElement.remove();
      cardComponent.removeElement();
      pageBody.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  document.addEventListener('keydown', onEscKeyDown);
  cardElement.querySelector('.film-details__close-btn').addEventListener('click', () => {
    // удаляем элемент из разметки
    cardElement.remove();
    // удаляем экземпляр объекта
    cardComponent.removeElement();
    pageBody.classList.remove('hide-overflow');
  });
};

filmsListContainers.addEventListener('click', cardsListHandler);
