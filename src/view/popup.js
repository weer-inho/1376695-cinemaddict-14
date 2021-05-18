import AbstractView from './abstract.js';

export const createPopupTemplate = (card) => {
  const {
    country,
    releaseDate,
    actors,
    writers,
    director,
    title,
    ratio,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isFavorite,
    isWatched,
  } = card;

  const watchListClass = isWatchlist !== false
    ? 'checked'
    : ' ';
  const favoriteClass = isFavorite !== false
    ? 'checked'
    : ' ';

  const watchedClass = isWatched !== false
    ? 'checked'
    : ' ';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${ratio}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genres[0]}</span>
                <span class="film-details__genre">${genres[1]}</span>
                <span class="film-details__genre">${genres[2]}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden " id="watchlist" name="watchlist" ${watchListClass}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedClass}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteClass}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

        <ul class="film-details__comments-list"></ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends AbstractView {
  constructor(card) {
    super();
    this._card = card;

    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._favoriteButtonHandler = this._favoriteButtonHandler.bind(this);
    this._watchedButtonHandler = this._watchedButtonHandler.bind(this);
    this._wathlistButtonHandler = this._wathlistButtonHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  _closeButtonHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setCloseButtonHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeButtonHandler);
  }

  _favoriteButtonHandler() {
    // evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteButtonHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoriteButtonHandler);
  }

  _watchedButtonHandler() {
    // evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedButtonHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._watchedButtonHandler);
  }

  _wathlistButtonHandler() {
    // evt.preventDefault();
    this._callback.wathlistClick();
  }

  setWatchlistButtonHandler(callback) {
    this._callback.wathlistClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._wathlistButtonHandler);
  }
}

