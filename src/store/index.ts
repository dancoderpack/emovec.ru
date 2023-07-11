import { createStore } from 'vuex';
import { Song } from '@/models/Song';

export default createStore({
  state: {
    favourites: [] as Song[],
  },
  getters: {
    favouriteSongs: (state) => state.favourites,
  },
  mutations: {
    addToFavourites(state, song: Song) {
      state.favourites = state.favourites.concat([song]);
    },
    removeFromFavourites(state, id: number) {
      state.favourites = state.favourites.filter((song) => song.id !== id);
    },
    clearFavourites(state) {
      state.favourites = [];
    },
  },
  actions: {},
  modules: {},
});
