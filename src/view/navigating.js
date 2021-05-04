import {drawFilmCards} from '../utils/draw-film-cards.js';

export const navigateCards = (evt, array, container, wrapper) => {
  switch(evt.target.hash) {
    case '#all': {
      drawFilmCards(
        array,
        container,
        wrapper,
      );
      return;
    }

    case '#watchlist': {
      drawFilmCards(
        array.filter((card) => card.isWatchlist),
        container,
        wrapper,
      );
      return;
    }

    case '#history': {
      drawFilmCards(
        array.filter((card) => card.isWatched),
        container,
        wrapper,
      );
      return;
    }

    case '#favorites': {
      drawFilmCards(
        array.filter((card) => card.isFavorite),
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
