import { AbstractView } from "../../common/view.js";
import onChange from "on-change";

export class MainView extends AbstractView{

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.setTitle("Search Movies")
    }

    appStateHook(path){
        if(path === 'favorites'){
            console.log(path)
            // this.render()
        }
    }

    render(){
        const main = document.createElement('div');
        main.innerHTML = `Count of movies: ${this.appState.favorites.length}`;
        this.app.innerHTML = '';
        this.app.append(main);
        this.appState.favorites.push('hhh')
    }

}