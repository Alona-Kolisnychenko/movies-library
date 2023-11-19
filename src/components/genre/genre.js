import { DivComponent } from '../../common/div-component';

import './genre.css';

export class Genre extends DivComponent {
  constructor(genre) {
    super();
    this.genre = genre;
  }

  render() {
    this.el.classList.add('info__genre-item');
    this.el.innerHTML = this.genre;
    return this.el;
  }
}
