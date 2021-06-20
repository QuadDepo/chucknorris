<template>
  <div class="navbar">
      <div class="row">
        <div class="col-xs-5 col-xs-offset-1 col-md-6 col-md-offset-0">
          <router-link to="/">
            <img src="assets/logo.svg" alt="Logo" class="navbar--logo">
          </router-link>
        </div>
        <div class="col-xs-5 end-xs col-md-6 end-md">
          <div class="navbar__items">
            <div class="navbar--item">
                <router-link to="/favourites"><favourite-icon /></router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import FavouriteIcon from "../FavouriteIcon";

export default {
  name: 'Navbar',
  components: {
    'favourite-icon': FavouriteIcon
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    max-height: 40px;
    padding: 1rem 0;
    border-bottom: 1px solid #e4e4e4;

    &--logo {
      display: block;
      height: 20px;
    }
  }
</style>