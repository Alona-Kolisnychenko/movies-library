import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";
import { Movie } from "./views/movie/movie";

class App {
 routes = [
    {path: '', view: MainView},
    {path: '#favorites', view: FavoritesView},
    {path: '#movie', view: Movie }
 ];
 appState = {
   favorites: [],
   movieId: ''
 }
 constructor(){
    window.addEventListener('hashchange', this.route.bind(this));
    this.route()
 }

 route(){
    if(this.currentView){
        this.currentView.destroy();
    }
    const view = this.routes.find(r => r.path === location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
 }
}

new App();