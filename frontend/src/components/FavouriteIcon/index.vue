<template>
  <img v-if="!favourite" class="favourite-icon" src="assets/heart.svg" />
  <img v-else class="favourite-icon" src="assets/heart-active.svg" />
</template>

<script>
export default {
  name: "FavouriteIcon",
  props: {
    favourite: {
      required: false,
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
  .favourite-icon {
    cursor: pointer;
    height: 20px;
    width: 20px;
  }
</style>
