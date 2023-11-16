import { DivComponent } from '../../common/div-component';

import './card.css';

export class Card extends DivComponent {
  constructor(cardState, appState) {
    super();
    this.cardState = cardState;
    this.appState = appState;
  }

  render() {
    this.el.classList.add('card');
    this.el.innerHTML = `
        <div class="card__image">
            <img src="" alt="poster" />
        </div>
        <div class="card__info">
            <div class="card_type">${}</div>
            <div class="title">${}</div>
            <div class="year">${}</div>
        </div>        
        <div></div> 
    `;
    return this.el;
  }
}
