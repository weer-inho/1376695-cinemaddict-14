import SmartView from '../view/smart.js';

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
        <input type="checkbox" class="film-details__control-input visually-hidden " id="watchlist" name="watchlist" ${isWatchlist ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
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

export default class Popup extends SmartView {
  constructor(card) {
    super();
    this._card = card;

    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._favoriteButtonHandler = this._favoriteButtonHandler.bind(this);
    this._watchedButtonHandler = this._watchedButtonHandler.bind(this);
    this._wathlistButtonHandler = this._wathlistButtonHandler.bind(this);
    this._emojiSmileHandler = this._emojiSmileHandler.bind(this);
    this._emojiSleepHandler = this._emojiSleepHandler.bind(this);
    this._emojiPukeHandler = this._emojiPukeHandler.bind(this);
    this._emojiAngryHandler = this._emojiAngryHandler.bind(this);

    this.getElement()
      .querySelector('label[for="emoji-smile"]')
      .addEventListener('click', this._emojiSmileHandler);
    this.getElement()
      .querySelector('label[for="emoji-sleeping"]')
      .addEventListener('click', this._emojiSleepHandler);
    this.getElement()
      .querySelector('label[for="emoji-puke"]')
      .addEventListener('click', this._emojiPukeHandler);
    this.getElement()
      .querySelector('label[for="emoji-angry"]')
      .addEventListener('click', this._emojiAngryHandler);
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  _emojiSmileHandler(evt) {
    evt.preventDefault();
    console.log('НАЖАЛ УЛЫБКУ');
  }
  _emojiSleepHandler(evt) {
    evt.preventDefault();
    console.log('НАЖАЛ СПАТЬ');
  }
  _emojiAngryHandler(evt) {
    evt.preventDefault();
    console.log('НАЖАЛ ЗЛОСТЬ');
  }
  _emojiPukeHandler(evt) {
    evt.preventDefault();
    console.log('НАЖАЛ РЫГНУТЬ');
  }


  _closeButtonHandler(evt) {
    evt.preventDefault();
    this._callback.click();
    console.log('закрылся');
  }

  setCloseButtonHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeButtonHandler);
  }

  _favoriteButtonHandler() {
    this._callback.favoriteClick();
  }

  setFavoriteButtonHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoriteButtonHandler);
  }

  _watchedButtonHandler() {
    this._callback.watchedClick();
    console.log('перерисовался')
  }

  setWatchedButtonHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._watchedButtonHandler);
  }

  _wathlistButtonHandler() {
    this._callback.wathlistClick();
  }

  setWatchlistButtonHandler(callback) {
    this._callback.wathlistClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._wathlistButtonHandler);
  }
}

