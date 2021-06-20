<template>
    <input
      :placeholder="placeholder"
      :value="value"
      class="search-input__input"
      type="text"
    />
</template>

<script>
export default {
  name: "search-input",
  props: {
    placeholder: {
      required: false,
      type: String,
      default: "The dark is afraid of Chuck Norris...",
    },
    value: {
      required: false,
      type: String,
      default: "",
    },
  }
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  width: 100%;

  &__input {
    width: 100%;
    border-radius: 22px;
    padding: 0 16px;
    height: 44px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    border: 1px solid #dfe1e5;
  }
}
</style>
