import { DivComponent } from '../../common/div-component.js';

import './pagination.css';

export class Pagination extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  #previousPage(){
    if(this.state.page > 1){
        this.state.page --
    }
  }
  #nextPage(){
    if(this.state.page < Math.ceil(Number(this.state.searchResults)/10)){
        this.state.page ++
    }
  }

  render() {
    this.el.innerHTML = '';
    this.el.classList.add('pagination');
    this.el.innerHTML = `
            <div class="pagination__item" id="previous">
                <img src="/static/previous.svg" alt="previous page"/>
                Previous page
            </div>
            <div class="pagination__item" id="next">
                Next page
                <img src="/static/next.svg" alt="next page"/>
            </div>
        `;

    this.el.querySelector('#previous').addEventListener('click', this.#previousPage.bind(this))
    this.el.querySelector('#next').addEventListener('click', this.#nextPage.bind(this))
    return this.el;
  }
}
