import { DivComponent } from '../../common/div-component';

import './card.css';

export class Card extends DivComponent {
  constructor(cardState, appState) {
    super();
    this.cardState = cardState;
    this.appState = appState;
  }

  #deleteFromFavorite() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.imdbID !== this.cardState.imdbID
    );
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  #addMovieId() {
    this.appState.movieId = this.cardState.imdbID;
  }

  render() {
    this.el.classList.add('card');
    const existInFavorites = this.appState.favorites.find(
      (b) => b.imdbID === this.cardState.imdbID
    );
    this.el.innerHTML = `
        <div class="card__image">
            <img src="${this.cardState.Poster}" alt="poster" />
        </div>
        <div class="card__info">
            <div class="card__type">${this.cardState.Type}</div>
            <a href="#movie" class="card__name">${this.cardState.Title}</a>
            <div class="card__year">${this.cardState.Year}</div>
            <div class="card__footer">
                <button class="button__add ${
                  existInFavorites ? 'button__active' : ''
                }">
                    ${
                      existInFavorites
                        ? '<img src="/static/favorites.svg"/>'
                        : '<img src="/static/favorite_white.svg"/>'
                    }
                </button>
            </div>
        </div>         
    `;
    if (existInFavorites) {
      this.el
        .querySelector('button')
        .addEventListener('click', this.#deleteFromFavorite.bind(this));
    } else {
      this.el
        .querySelector('button')
        .addEventListener('click', this.#addToFavorites.bind(this));
    }
    this.el
      .querySelector('.card__name')
      .addEventListener('click', this.#addMovieId.bind(this));
    return this.el;
  }
}
