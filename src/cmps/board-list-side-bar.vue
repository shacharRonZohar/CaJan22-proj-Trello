<template>
  <section class="board-list-side-bar">
    <ul class="clean-list">
      <li>
        <router-link to="/board">
          <i class="boards-menu-icon" />
          <span>Boards</span>
        </router-link>
      </li>
      <li>
        <span>
          <i class="templates-menu-icon" />
          <span>Templates</span>
        </span>
      </li>
      <li>
        <span>
          <i class="Home-menu-icon" />
          <span>Home</span>
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
};
</script>

<style>
</style>