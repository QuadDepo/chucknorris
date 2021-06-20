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
    async fetchJokes({ commit, state }, payload) {
      try {
        // if isSearchQuery is false remove the query from the payload to only filter on active checkboxes.
        if (!state.isQuerySearch) {
          delete payload?.query;
        }

        // if isSearchQuery is true remove the checkboxes from the payload to only filter on query.
        if (state.isQuerySearch) {
          delete payload?.categories;
        }

        // Create url Params
        const queryString = new URLSearchParams(payload);
        // Set loading to true for UI change
        commit("setLoading", true);
        // Set older Error back to false
        commit("setError", false);

        // Get Jokes
        const data = await fetch(`/jokes?${queryString}`);
        const res = await data.json();

        // Handle 500 error status and create error with err message
        if (data.status === 500) throw new Error(res.err);

        // Increment search count for UI change, to check if this was not the first time.
        commit("setSearchCount");
        // Set Jokes in store
        commit("setJokes", res);
      } catch (error) {
        commit("setError", error);

        // Create error notification
        notify({
          title: "Chuck Norris says no!",
          text: error,
          type: "error",
        });

        console.error(error);
      } finally {
        // Set Loading to false
        commit("setLoading", false);
      }
    },
  },
});

// Subscribe to store to save to LocalStorage
Store.subscribe((mutation, { favourites, isQuerySearch }) => {
  // Only save state elements that are needed.
  localStorage.setItem("store", JSON.stringify({ favourites, isQuerySearch }));
});

export default Store;
