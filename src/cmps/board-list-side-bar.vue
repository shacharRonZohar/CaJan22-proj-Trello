<template>
      <section class="board-list-side-bar">
      <ul class="clean-list">
        <li>
          <router-link to="/board">
          <a class="boards-menu-icon" />
          <span>Boards</span>
          </router-link>
         </li>
        <li><a class="templates-menu-icon" /><span>Templates</span></li>
        <li><a class="Home-menu-icon" /><span>Home</span></li>
      </ul>
      </section>
</template>

<script>
export default {
  props: {

  },
  components: {

  },
  data() {
    return {};
  },
  created() {},
  methods: {
  },
  computed: {
  },
};
</script>

<style>
</style>