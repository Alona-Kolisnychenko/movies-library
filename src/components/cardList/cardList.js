import { DivComponent } from '../../common/div-component.js';
import { Card } from '../card/card.js';

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
    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card__grid');
    this.el.appendChild(cardGrid);
    for (const card of this.state.list){
      cardGrid.append( new Card(card, this.appState).render())
    }
    return this.el;
  }
}
