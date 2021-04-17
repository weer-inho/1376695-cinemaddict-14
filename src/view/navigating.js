export const navigateCards = (evt, array, count, container, callback) => {
  switch(evt.target.hash) {
    case '#all': {
      callback(
        array,
        count,
        container,
      );
      return;
    }

    case '#watchlist': {
      callback(
        array.filter((card) => card.isWatchlist),
        count,
        container,
      );
      return;
    }

    case '#history': {
      callback(
        array.filter((card) => card.isWatched),
        count,
        container,
      );
      return;
    }

    case '#favorites': {
      callback(
        array.filter((card) => card.isFavorite),
        count,
        container,
      );
      return;
    }

    default: {
      return;
    }
  }
};
