import AbstractView from './abstract.js';

const createSectionFilmsTemplate = () => {
  return `<section class="films">
          </section>`;
};

export default class SectionFilms extends AbstractView {
  getTemplate() {
    return createSectionFilmsTemplate();
  }
}


