export const constsForSort = {
  defaultSort: 'Sort by default',
  dateSort: 'Sort by date',
  ratingSort: 'Sort by rating',
};

export const sortCards = (evt, array) => {
  switch(evt.target.innerText) {
    case constsForSort.defaultSort: {
      return array;
    }

    case constsForSort.dateSort: {
      return [...array].sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
    }

    case constsForSort.ratingSort: {
      return [...array].sort((a, b) => {
        if (a.ratio < b.ratio) {
          return -1;
        }
        if (a.ratio > b.ratio) {
          return 1;
        }
        return 0;
      });
    }

    default: {
      return;
    }
  }
};

