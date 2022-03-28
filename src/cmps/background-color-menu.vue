<template>
  <section class="right-menu background-color-menu">
    <header class="flex space-between">
      <a @click="goBack" class="back-menu-icon" />
      <h1>Colors</h1>
      <a class="close-menu-icon" @click="closeColorMenu" />
    </header>
    <hr />
    <ul class="clean-list flex right-menu-colors-list">
      <li v-for="bgColor in colors" :key="bgColor">
        <div
          class="right-menu-colors"
          @click="setBackGroundColor(bgColor)"
          :style="{ backgroundColor: bgColor }"
        >
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  data() {
    return {
      colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91']
    };
  },
  async created() {
    
  },
  methods: {
    async searchPhotos() {
      const res = await imgService.queryPhotos(this.searchTxt);
      this.results = res.results;
    },
    goBack() {
      this.$emit("goBack");
    },
    setBackGroundColor(color) {
      this.$emit("setBackGroundColor", color);
    },
    closeColorMenu() {
      this.$emit("closeColorMenu");
    },
  },
};
</script>