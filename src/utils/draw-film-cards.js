import {render} from '../utils/util.js';
import {createCardTemplate} from '../view/card.js';

export const drawFilmCards = (films, count, container) => {
  container.innerText = '';

  const limit = Math.min(films.length, count);

  for (let i = 0; i < limit; i++) {
    render(container, createCardTemplate(films [i]));
  }
};
