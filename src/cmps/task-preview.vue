<template>
  <section v-if="task" class="task-preview" @click="openTaskDetails">
    <div
      class="task-cover-color"
      v-if="task.cover?.type === 'color'"
      :style="{ backgroundColor: `${bgColor}` }"
    ></div>
    <div
      class="task-cover-img"
      v-if="task.cover?.type === 'img'"
      :style="{ backgroundImage: `${img}` }"
    ></div>
    <!-- v-if="task.labelIds?.length" -->
    <main>
      <ul class="flex clean-list" v-if="task.labelIds?.length">
        <li
          :title="title"
          @click.stop="labelClicked"
          v-for="label in labels"
          :key="label"
        >
          <div
            class="task-label"
            :style="{ backgroundColor: `${label.color}` }"
          >
            {{ label.title }}
          </div>
        </li>
      </ul>
      <h2 class="task-preview-title">{{ task.title }}</h2>
      <div v-if="task.description" class="actions-container flex">
        <div class="description-preview">
          <a     
            class="description-icon"
            title="This card has a description"
          />
        </div>
        <div v-if="task.attachments?.length" class="attachment-preview">
          <a
            class="attachments-icon"
            title="attachments"
          />
          <span class="attach-num">
            {{attachNum}}
          </span>
        </div>
        <div v-if="task.checklist" class="checklist-preview" :class="isDone">
          <a class="checklist-icon" title="Checklist items" />
          <span class="checkedSum">
            {{checkedSum}}
          </span>
        </div>
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
      // title: 'important',
      checklist: {
        id: 'asdasd',
        title: 'todo',
        items: [
          {
            id:'sfdfs',
            title: 'done this',
            done: true
        },
          {
            id:'sfdfs',
            title: 'done that',
            done: true
        }
        ]
      }
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
    },
    complitedItems(){
      return this.checklist.items.filter(item => item.done)
    },
    checkedSum(){
      return `${this.complitedItems.length}/${this.checklist.items.length}`
    },
    isDone(){
      return this.complitedItems.length === this.checklist.items.length? 'done' : ''
    },
    isDone(){
      return this.complitedItems.length === this.checklist.items.length? 'done' : ''
    },
  },
  unmounted() {},
};
</script>

<style>
</style>