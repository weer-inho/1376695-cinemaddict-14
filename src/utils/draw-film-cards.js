import {renderElement, renderPosition} from './render.js';
import CardView from '../view/card.js';
import ShowMoreButtonView from '../view/show-more-button.js';

export const drawFilmCards = (films, container, wrapper) => {
  container.innerText = '';
  const MOVIES_PER_STEP = 5;

  const limit = Math.min(films.length, MOVIES_PER_STEP);

  for (let i = 0; i < limit; i++) {
    renderElement(container, new CardView(films [i]).getElement(), renderPosition.BEFOREEND);
  }

  if (films.length > MOVIES_PER_STEP) {
    let renderTemplateedCardCount = MOVIES_PER_STEP;

    if (!document.querySelector('.films-list__show-more')) {
      const buttonComponent = new ShowMoreButtonView();
      renderElement(wrapper, buttonComponent.getElement(), renderPosition.BEFOREEND);

      const loadMoreButton = wrapper.querySelector('.films-list__show-more');

      buttonComponent.setButtonShowMore(() => {
        films
          .slice(renderTemplateedCardCount, renderTemplateedCardCount + MOVIES_PER_STEP)
          .forEach((card) => renderElement(container, new CardView(card).getElement(), renderPosition.BEFOREEND));

        renderTemplateedCardCount += MOVIES_PER_STEP;

        if (renderTemplateedCardCount >= films.length) {
          loadMoreButton.remove();
        }
      });
    }
  }
};
