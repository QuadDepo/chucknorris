<template>
  <div class="favourites">
    <div class="row center-xs">
      <div class="col-xs-12 col-offset-md-1 col-md-10">
        <div class="favourites__header">
          <h1 class="favourites__header--title">
            Favourites <span class="favourites__header--count">({{favourites.length}}/5)</span>
          </h1>
        </div>
        <template v-if="favourites.length > 0">
          <Joke v-for="joke in favourites" :key="joke.id" :joke="joke" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Joke from "../components/Joke";

export default {
  name: "Favourites",
  components: {
    Joke,
  },
  computed: {
    ...mapGetters(["favourites"]),
  },
};
</script>

<style lang="scss" scoped>
.favourites {
  padding-bottom: 5rem;
  
  &__header {
    &--count {
      opacity: 0.5;
      font-size: 1rem;
      font-weight: 400;
    }

    &--title {
      text-align: left;
    }
  }
}
</style>
