<template>
    <div class="container">
      <notifications />
      <navbar />
      <div class="row center-xs">
        <div class="col-xs-10 col-md-10">
          <router-view />
        </div>
      </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    navbar: Navbar
  },
  
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 0 3rem 0;
  }
</style>

<style lang="scss">
  .vue-notification {
    margin: 1rem 1rem 0 0;
  }
</style>
