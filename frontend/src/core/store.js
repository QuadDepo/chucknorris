import { createStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";

const Store = createStore({
  state() {
    return {
      favourites: [],
      jokes: [],
      loading: false,
      error: false,
      searches: 0,
      isQuerySearch: true,
    };
  },
  getters: {
    favourites(state) {
      return state.favourites;
    },
    jokes(state) {
      return state.jokes;
    },
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    addtoFavourites(state, payload) {
      if (this.state.favourites.length === 5) {
        notify({
          title: "Chuck Norris says no!",
          text: "You reach the maxium limit of favourite jokes",
          type: "error",
        });

        return;
      }

      notify({
        title: "Joke added!",
        text: "Joke has been added to your favourites",
      });

      state.favourites.push(payload);
    },
    removefromFavourites(state, payload) {
      notify({
        title: "Jokes removed!",
        text: "Joke has been removed to your favourites",
        type: "warn",
      });

      state.favourites = state.favourites.filter(({ id }) => payload !== id);
    },
    setJokes(state, payload) {
      state.jokes = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setSearchCount(state) {
      state.searches = ++state.searches;
    },
    toggleIsQuerySearch(state) {
      state.isQuerySearch = !state.isQuerySearch;
    },
  },
  actions: {
    async fetchJokes({ commit }, payload) {
      try {
        const queryString = new URLSearchParams(payload);
        commit("setLoading", true);
        commit("setError", false);

        const data = await fetch(`/jokes?${queryString}`);
        const res = await data.json();

        if (data.status === 500) throw new Error(res.err);

        commit("setSearchCount");
        commit("setJokes", res);
      } catch (error) {
        commit("setError", error);

        notify({
          title: "Chuck Norris says no!",
          text: error,
          type: "error",
        });

        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
});

Store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default Store;
