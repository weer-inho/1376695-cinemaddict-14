import UserRankView from './view/user-rank.js';
import MoviesNumberView from './view/movies-number.js';
import {generateCard} from './mock/card.js';
import {render, renderPosition} from './utils/render.js';
import MainPresenter from './presenter/main-presenter.js';

const ALL_MOVIES = 15;
const cards = new Array(ALL_MOVIES).fill().map(generateCard);
const pageBody = document.querySelector('body');
const siteHeaderElement = pageBody.querySelector('.header');
const siteMainElement = pageBody.querySelector('.main');
const siteFooterStatElement = pageBody.querySelector('.footer__statistics');

const mainPresenter = new MainPresenter(siteMainElement);
mainPresenter.init(cards);
render(siteHeaderElement, new UserRankView(), renderPosition.BEFOREEND);
render(siteFooterStatElement, new MoviesNumberView(cards.length), renderPosition.BEFOREEND);
