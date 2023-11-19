import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Pagination } from '../../components/pagination/pagination.js';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    page: 2,
    searchResults: '0',
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Search Movies');
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

  async loadList(s, page) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=907c9a79&s=${s}&page=${page}&plot=full`
    );
    return res.json();
  }

  async stateHook(path) {
    if (path === 'searchQuery' || path === 'page') {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.page);
      this.state.loading = false;
      this.state.searchResults = data.totalResults;
      this.state.list = data.Search;
    }
    if (path === 'list' || path === 'loading') {
      this.render();
    }
  }

  render() {
    const main = document.createElement('div');
    main.innerHTML = `
      <h1>${this.state.searchResults} results were found</h1>
    `;
    main.append(new Search(this.state).render());
    main.append(new CardList(this.state, this.appState).render());
    main.append(new Pagination(this.state).render());
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
