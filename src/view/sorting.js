import {drawFilmCards} from '../utils/draw-film-cards.js';

export const constsForSort = {
  defaultSort: 'Sort by default',
  dateSort: 'Sort by date',
  ratingSort: 'Sort by rating',
};

export const sortCards = (evt, array, container, wrapper) => {
  switch(evt.target.innerText) {
    case constsForSort.defaultSort: {
      drawFilmCards(
        array,
        container,
        wrapper,
      );
      return;
    }

    case constsForSort.dateSort: {
      drawFilmCards(
        [...array].sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        }),
        container,
        wrapper,
      );
      return;
    }

    case constsForSort.ratingSort: {
      drawFilmCards(
        [...array].sort((a, b) => {
          if (a.ratio < b.ratio) {
            return -1;
          }
          if (a.ratio > b.ratio) {
            return 1;
          }
          return 0;
        }),
        container,
        wrapper,
      );
      return;
    }

    default: {
      return;
    }
  }
};
