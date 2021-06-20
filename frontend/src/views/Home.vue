<template>
  <div class="joke">
    <div class="row center-xs">
      <div class="col-xs-8 col-md-4">
        <img src="assets/logo.svg" />
      </div>
      <search-wrapper @onSearch="getJokes" />
    </div>
    <div v-if="!loading && !error" class="row"> 
      <Joke v-for="joke in jokes" :key="joke.id" :joke="joke" />
      <p v-if="jokes.length === 0 && searches > 0">
        No Jokes! Even Chuck Norris is disapointed.
      </p>
    </div>
    <div v-if="error" class="row"> 
      <p>Oeps something went wrong!</p>
    </div>
    <div v-if="loading" class="row"> 
      <p>Loading....</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SearchWrapper from "../components/SearchWrapper";
import Joke from "../components/Joke"

export default {
  name: "Home",
  components: {
    'search-wrapper': SearchWrapper,
    Joke,
  },
  computed: {
    ...mapGetters(["jokes"]),
    ...mapState(["loading","error", "searches", "isQuerySearch"]),
  },

  methods: {
    ...mapActions([
      "fetchJokes"
    ]),

    getJokes(random) {
      const payload = {...this.$route.query}
      // convert string to bool

      if (random) {
        this.fetchJokes()
        return;
      }

      if (!this.isQuerySearch) {
        delete payload.query;
      }

      if (this.isQuerySearch) {
        delete payload.categories;
      }

      this.fetchJokes(payload)
    }
  },

  mounted() {
    const { query } = this.$route;

    if (!(Object.prototype.hasOwnProperty.call(query, 'categories') || Object.prototype.hasOwnProperty.call(query, 'query'))) {
      return;
    }

    this.getJokes()
  }
};
</script>

<style lang="scss" scoped>
  .joke {
    padding-top: 3rem;
  }
</style>