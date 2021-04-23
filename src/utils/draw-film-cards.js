import {renderElement, renderPosition} from '../utils/util.js';
import CardView from '../view/card.js';

export const drawFilmCards = (films, count, container) => {
  container.innerText = '';

  const limit = Math.min(films.length, count);

  for (let i = 0; i < limit; i++) {
    renderElement(container, new CardView(films [i]).getElement(), renderPosition.BEFOREEND);
  }
};
