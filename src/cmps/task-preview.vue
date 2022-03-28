<template>
  <section v-if="task" class="task-preview" @click="openTaskDetails">
    <div class="task-cover-color" v-if="task.cover?.type === 'color'" :style="{backgroundColor: `${bgColor}`}"></div>
    <div class="task-cover-img" v-if="task.cover?.type === 'img'" :style="{ backgroundImage: `${img}` }"></div>
    <!-- v-if="task.labelIds?.length" -->
    <main>
      <ul class="flex clean-list" v-if="task.labelIds?.length">
       <li :title="title" @click.stop="labelClicked" v-for="label in labels" :key="label">
          <div class="task-label" :style="{backgroundColor: `${label.color}`}">
           {{label.title}}
          </div>
       </li>
      </ul>
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
        <span v-if="task.attachments?.length" class="attach-num">{{ attachNum }}</span>
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
    return {
      title: 'important',
    };
  },
  created() {
  },
  methods: {
    openTaskDetails() {
      this.$router.push(this.$route.fullPath + "/task/" + this.task.id);
      this.$emit("openTaskDetails");
    },
    labelClicked() {
      this.$emit('labelClicked')
    }
  },
  computed: {
    attachNum() {
      return this.task.attachments?.length;
    },
    img() {
      return this.task.cover.backgroundImage
    },
    bgColor(){
      return this.task.cover.backgroundColor
    },
    labels(){
      return this.task.labelIds.map(labelId => {
        return this.$store.getters.labelById(labelId)
      })
    }
  },
  unmounted() {},
};
</script>

<style>
</style>