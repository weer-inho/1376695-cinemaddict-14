export const constsForSort = {
  defaultSort: 'Sort by default',
  dateSort: 'Sort by date',
  ratingSort: 'Sort by rating',
};

export const sortCards = (evt, array, count, container, callback, sortObject) => {
  switch(evt.target.innerText) {
    case sortObject.defaultSort: {
      callback(
        array,
        count,
        container,
      );
      return;
    }

    case sortObject.dateSort: {
      callback(
        [...array].sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        }),
        count,
        container,
      );
      return;
    }

    case sortObject.ratingSort: {
      callback(
        [...array].sort((a, b) => {
          if (a.ratio < b.ratio) {
            return -1;
          }
          if (a.ratio > b.ratio) {
            return 1;
          }
          return 0;
        }),
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
