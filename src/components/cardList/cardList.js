import { DivComponent } from '../../common/div-component';

import './cardList.css';

export class CardList extends DivComponent {
  constructor(state, appState) {
    super();
    this.state = state;
    this.appState = appState;
  }

  render() {
    if(this.state.loading){
        this.el.innerHTML = `
            <div class="card_list_loader">Loading...</div>
        `;
        return this.el;
    }
    this.el.classList.add('card_list');
    console.log(this.state.searchResults)
    this.el.innerHTML = `
            <h1>${this.state.searchResults} results were found</h1>
        `;
    return this.el;
  }
}
