import {createSiteMenuTemplate} from './view/site-menu.js';
import {createCardTemplate} from './view/card.js';
import {createSectionFilmsTemplate} from './view/section-films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmsListTopTemplate} from './view/films-list-top.js';
import {createFilmsListCommentedTemplate} from './view/films-list-commented.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createMoviesNumberTemplate} from './view/movies-number.js';

const ALL_MOVIES = 5;
const EXTRA_MOVIES = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatElement = document.querySelector('.footer__statistics');

render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSectionFilmsTemplate());
render(siteHeaderElement, createUserRankTemplate());
render(siteFooterStatElement, createMoviesNumberTemplate());

const sectionFilms = siteMainElement.querySelector('.films');

render(sectionFilms, createFilmsListTemplate());
render(sectionFilms, createFilmsListTopTemplate());
render(sectionFilms, createFilmsListCommentedTemplate());

const filmsListContainers = sectionFilms.querySelectorAll('.films-list__container');

for (let i = 0; i < ALL_MOVIES; i++) {
  render(filmsListContainers[0], createCardTemplate());
}

for (let i = 0; i < EXTRA_MOVIES; i++) {
  render(filmsListContainers[1], createCardTemplate());
}

for (let i = 0; i < EXTRA_MOVIES; i++) {
  render(filmsListContainers[2], createCardTemplate());
}
