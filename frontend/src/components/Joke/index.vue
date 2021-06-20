<template>
  <div class="joke-item">
    <div class="joke-item__header">
      <h2 class="joke-item--title">
        {{joke.value}} <favourite-icon :favourite="isFavourite" @click.stop="toggleFavourite" />
        <span v-if="categories" class="joke-item--category">
          Catergory: {{categories}}
        </span>
      </h2>
    </div>
  </div>
</template>

<script>
import FavouriteIcon from "../FavouriteIcon";
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Joke',
  components: {
    'favourite-icon': FavouriteIcon,
  },
  props: {
    joke: {
      required: true,
      type: Object,
    }
  },

  computed: {
    ...mapGetters(["favourites"]),

    categories() {
      return this.joke.categories?.toString();
    },

    isFavourite() {
      return this.favourites.find(({id}) => id === this.joke.id);
    }
  },

  methods: {
    ...mapMutations(["addtoFavourites", "removefromFavourites"]),

    toggleFavourite() {
      if (this.isFavourite) {
        this.removefromFavourites(this.joke.id);
        return;
      }

      this.addtoFavourites(this.joke)
    }
  }
}
</script>

<style lang="scss" scoped>
  .joke-item {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e4e4e4;;

    & + & {
      padding-top: 1rem;
    }

    &__header {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &--count {
      opacity: 0.1;
      font-size: 7rem;
      font-weight: 900;
    }

    &--title { 
      display: inline-block;
      font-size: 1.5rem;
      margin: 0;
      text-align: left;
      word-break: break-word;
    }

    &--category {
      display: block;
      width: 100%;
      margin-top: .5rem;;
      opacity: 0.4;
      font-size: 1rem;
      font-weight: 300;
      font-style: italic;
    }
  }
</style>