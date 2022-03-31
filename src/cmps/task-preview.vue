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

      <div class="actions-container flex">

        <div v-if="task.dueDate" class="date-preview" :class="taskStatus" @click.stop="dateChecked">
          <a class="date-icon"></a>
          <a class="checked-icon"></a>
          <a class="complited-icon"></a>
          <span class="date">{{ date }}</span>
        </div>

        <div v-if="task.description" class="description-preview">
          <a class="description-icon" title="This card has a description" />
        </div>

        <div v-if="task.attachments?.length" class="attachment-preview">
          <a class="attachments-icon" title="attachments" />
          <span class="attach-num">
            {{ attachNum }}
          </span>
        </div>

        <div
          v-if="task.checklists && isItems"
          class="checklist-preview"
          :class="isDone"
        >
          <a class="checklist-icon" title="Checklist items" />
          <span class="checkedSum">
            {{ checkedSum }}
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
        id: "asdasd",
        title: "todo",
        items: [
          {
            id: "sfdfs",
            title: "done this",
            done: true,
          },
          {
            id: "sfdfs",
            title: "done that",
            done: true,
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    openTaskDetails() {
      this.$router.push(this.$route.fullPath + "/task/" + this.task.id);
      this.$emit("openTaskDetails");
    },
    labelClicked() {
      this.$emit("labelClicked");
    },
    dateChecked(){
      this.task.dueDate.isDone = !this.task.dueDate.isDone
      this.$emit("dateChecked", this.task.id);
    }
  },
  computed: {
    attachNum() {
      return this.task.attachments?.length;
    },
    img() {
      return this.task.cover.backgroundImage;
    },
    bgColor() {
      return this.task.cover.backgroundColor;
    },
    labels() {
      return this.task.labelIds.map((labelId) => {
        return this.$store.getters.labelById(labelId);
      });
    },
    checkedSum() {
      return `${this.doneSum}/${this.itemsSum}`;
    },
    isDone() {
      return this.itemsSum === this.doneSum ? "done" : "";
    },
    itemsSum() {
      return this.task.checklists.reduce(
        (acc, checklist) => acc + checklist.items.length,
        0
      );
    },
    doneSum() {
      const dones = this.task.checklists.map((checklist) =>
        checklist.items.filter((item) => item.isDone)
      );
      return dones.reduce((acc, done) => acc + done.length, 0);
    },
    isItems() {
      return this.itemsSum === 0 ? false : true;
    },
    date() {
      const starTime = new Date(this.task.dueDate.startDate);
      const endTime = new Date(this.task.dueDate.endDate);
      const startDate = `${starTime.toLocaleString("en", {
        month: "short",
      })} ${starTime.getDate()}`;
      const endDate = `${endTime.toLocaleString("en", {
        month: "short",
      })} ${endTime.getDate()}`;
      return this.task.dueDate.startDate ? `${startDate}-${endDate}` : endDate;
    },
    taskStatus() {
      if (this.task.dueDate.endDate < Date.now()) return "overdue";
      else if (this.task.dueDate.isDone) return 'complited'
      else if (
        Math.abs(this.task.dueDate.endDate - Date.now()) / (60 * 60 * 1000) <
        24
      )return "due-soon";
      return "";
    },
  },
};
</script>

<style>
</style>