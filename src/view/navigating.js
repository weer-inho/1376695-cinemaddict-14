export const navigateCards = (evt, array) => {

  switch(evt.target.hash) {
    case '#all': {
      return array;
    }

    case '#watchlist': {
      return array.filter((card) => card.isWatchlist);
    }

    case '#history': {
      return array.filter((card) => card.isWatched);
    }

    case '#favorites': {
      return array.filter((card) => card.isFavorite);
    }

    default: {
      return;
    }
  }
};
