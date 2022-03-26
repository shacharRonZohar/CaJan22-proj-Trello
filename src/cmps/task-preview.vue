<template>
  <section v-if="task" class="task-preview" @click="openTaskDetails">
    <div class="task-cover-color" v-if="task.description"></div>
    <div class="task-cover-img" v-if="task.attachments?.length" :style="{ backgroundImage: `url(${img})` }"></div>
    <main>
      <h2>{{ task.title }}</h2>
      <div class="actions-container flex">
        <a
          v-if="task.description"
          class="description-icon"
          title="This card has a description"
        />
        <a
          v-if="task.attachments?.length"
          class="attachments-icon"
          title="attachments"
        />
        <span class="attach-num">{{ attachNum }}</span>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    openTaskDetails() {
      this.$router.push(this.$route.fullPath + "/task/" + this.task.id);
      this.$emit("openTaskDetails");
    },
  },
  computed: {
    attachNum() {
      return this.task.attachments?.length;
    },
    img() {
      return new URL(`../assets/imgs/boardBackground/1.jpg`, import.meta.url).href;
    },
  },
  unmounted() {},
};
</script>

<style>
</style>