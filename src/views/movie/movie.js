import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Genre } from '../../components/genre/genre.js';

import './movie.css';

export class Movie extends AbstractView {
    state = {
        loading: false, 
        movie: {}
      };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Details');
  }

  #deleteFromFavorite() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.imdbID !== this.state.movie.imdbID
    );
  }

  #addToFavorites() {
    this.appState.favorites.push(this.state.movie);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async loadList(i) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=907c9a79&i=${i}&plot=full`
    );
    return res.json()
  }
  async stateHook(path) {
    if (path === 'movie' || path === 'loading') {
      this.renderPage();
    }
  }

  async getMovieInformation() {
    this.state.loading = true;
    const data = await this.loadList(this.appState.movieId)
    this.state.loading = false;
    this.state.movie = data; 
  }
  
  async render() {
    await this.getMovieInformation();
    this.renderPage();
  }
  renderPage(){
    const existInFavorites = this.appState.favorites.find(
        (b) => b.imdbID === this.state.movie.imdbID
      );
    const main = document.createElement('div');
    main.classList.add('info');
    if(this.state.loading){
        main.innerHTML = `Loading...`
    } else{
        const title = document.createElement('h1');
        title.classList.add('info__title');
        title.innerHTML = this.state.movie.Title;
        const top = document.createElement('div');
        top.classList.add('info__top');
        top.innerHTML = `
            <div class="info__poster">
                <img src="${this.state.movie.Poster}" alt="poster"/>
            </div>
            <div class="info__list">
                <dl>
                    <div><dt>Actors:</dt><dd>${this.state.movie.Actors}</dd></div>
                    <div><dt>Country:</dt><dd>${this.state.movie.Country}</dd></div>
                    <div><dt>Language:</dt><dd>${this.state.movie.Language}</dd></div>
                    <div><dt>Writer:</dt><dd>${this.state.movie.Writer}</dd></div>
                </dl>
                <button type="button">Add to favorites</button>
            </div>
        `;
        const description = document.createElement('div');
        description.classList.add('info__description');
        description.innerHTML = `
            <p class="info__description-title">Description:</p>
            <p>${this.state.movie.Plot}</p>
        `;
        const bottom = document.createElement('div');
        bottom.classList.add('info__genre');
        const bottomTitle = document.createElement('p');
        bottomTitle.classList.add('info__genre-title')
        bottomTitle.innerHTML = 'Genre:';
        bottom.appendChild(bottomTitle);
        const bottomGenres = document.createElement('div');
        bottomGenres.classList.add('info__genres');
        const genres = this.state.movie.Genre?.split(',');
        if(genres){
            for (let genre of genres){
                bottomGenres.appendChild(new Genre(genre).render());
            }
        } 
        bottom.appendChild(bottomGenres);
        main.appendChild(title);
        main.appendChild(top);
        main.appendChild(description);
        main.appendChild(bottom);
        const button = main.querySelector('button');
        if (existInFavorites) {
            button.addEventListener('click', this.#deleteFromFavorite.bind(this));
          } else {
            button.addEventListener('click', this.#addToFavorites.bind(this));
          }
    }
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
