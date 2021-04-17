import {createSiteMenuTemplate} from './view/site-menu.js';
import {createCardTemplate} from './view/card.js';
import {createSectionFilmsTemplate} from './view/section-films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createMoviesNumberTemplate} from './view/movies-number.js';
import {createPopupTemplate} from './view/popup.js';
import {createButtonTemplate} from './view/show-more-button.js';
import {generateCard} from './mock/card.js';
import {render} from './utils/util.js';
import {drawFilmCards} from './utils/draw-film-cards.js';
import {sortCards} from './view/sorting.js';
import {navigateCards} from './view/navigating.js';

const ALL_MOVIES = 19;
const MOVIES_PER_STEP = 5;

const cards = new Array(ALL_MOVIES).fill().map(generateCard);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatElement = document.querySelector('.footer__statistics');

render(siteMainElement, createSiteMenuTemplate(cards));
render(siteHeaderElement, createUserRankTemplate());
render(siteFooterStatElement, createMoviesNumberTemplate());
render(siteMainElement, createSectionFilmsTemplate());
const sectionFilms = siteMainElement.querySelector('.films');

render(sectionFilms, createFilmsListTemplate());


const filmsListContainers = sectionFilms.querySelector('.films-list__container');

const mainNavigationElement = document.querySelector('.main-navigation');

const constsForSort = {
  defaultSort: 'Sort by default',
  dateSort: 'Sort by date',
  ratingSort: 'Sort by rating',
};

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
  let renderedCardCount = MOVIES_PER_STEP;

  render(sectionFilms, createButtonTemplate());

  const loadMoreButton = sectionFilms.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + MOVIES_PER_STEP)
      .forEach((card) => render(filmsListContainers, createCardTemplate(card)));

    renderedCardCount += MOVIES_PER_STEP;

    if (renderedCardCount >= cards.length) {
      loadMoreButton.remove();
    }
  });
}

const pageBody = document.querySelector('body');
pageBody.classList.add('.hide-overflow');
render(pageBody, createPopupTemplate(cards[0]));

const popupToggleClass = () => {
  popup.classList.toggle('visually-hidden');
};

const popup = document.querySelector('.film-details');
const popupCloseBotton = popup.querySelector('.film-details__close-btn');
popupCloseBotton.addEventListener('click', () => {
  popupToggleClass();
});

const firstFilmPoster = document.querySelector('.film-card__poster');
firstFilmPoster.addEventListener('click', () => {
  popupToggleClass();
});

const filmCardTitle = document.querySelector('.film-card__title');
filmCardTitle.addEventListener('click', () => {
  popupToggleClass();
});

const filmCardComments = document.querySelector('.film-card__comments');
filmCardComments.addEventListener('click', () => {
  popupToggleClass();
});
