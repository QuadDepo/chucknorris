<template>
  <div class="search-wrapper">
    <div class="row center-xs">
      <div class="col-xs-12 col-md-8">
        <keep-alive>
        <search-input
          v-if="$store.state.isQuerySearch"
          :value="query"
          @keyup.enter="() => emitSearch(false)"
          @input="setValue"
        />
        <checkbox-group
          v-else
          :defaultChecked="categories"
          @onCheck="setSelectedCategories"
        />
        </keep-alive>
      </div>
      <div class="col-xs-12 button-group">
        <Button @click="toggleFilter" :type="['outline']">Toggle filter</Button>
        <Button @click="() => emitSearch(true)" :type="['secondary']"
          >I'm feeling Norris</Button
        >
        <Button @click="() => emitSearch(false)">Search</Button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "../SearchInput";
import CheckboxGroup from "../CheckboxGroup";
import Button from "../Button";

export default {
  name: "SearchWrapper",
  components: {
    "search-input": SearchInput,
    "checkbox-group": CheckboxGroup,
    Button,
  },

  data: function() {
    return {
      query: "",
      categories: [],
    };
  },

  methods: {
    toggleFilter() {
      this.$store.commit('toggleIsQuerySearch')
    },

    setValue({ target }) {
      this.$router.replace({
        name: "Home",
        query: { ...this.$route.query, query: target.value },
      });
    },

    setSelectedCategories(e) {
      this.$router.replace({
        name: "Home",
        query: { ...this.$route.query, categories: Object.values(e) },
      });
    },

    emitSearch(random = false) {
      this.$emit("onSearch", random, this.isQuerySearch);
    },
  },

  updated() {
    this.$nextTick(function() { 

    });
  },

  beforeMount() {
    const { query, categories } = this.$route.query;

    // set router query as state
    this.query = query

    if (!categories) {
      return;
    }

    if (Array.isArray(categories)) {
      this.categories = categories;
      return;
    }

    this.categories = [categories]
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  width: 100%;
  padding: 2rem 0;

  &__inner {
    display: flex;
    align-items: flex-start;

    * + * {
      margin-left: 2rem;
    }
  }

  .button-group {
    margin-top: 1rem;

    button + button {
      margin-left: 1.2rem;
    }
  }
}
</style>
