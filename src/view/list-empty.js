import AbstractView from './abstract.js';

const createEmptyList = () => {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
};

export default class NoCards extends AbstractView {
  getTemplate() {
    return createEmptyList();
  }
}
