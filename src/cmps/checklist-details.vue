<template>
  <div class="checklist-header" v-if="checklist">
    <div class="checklist-icon" />
    <h3>{{ checklist.title }}</h3>
    <button class="delete-checklist">Delete</button>
  </div>

  <div
    class="checklist-items"
    :class="isItemDone(item)"
    v-for="item in checklist.items"
    :key="item.id"
  >
    <div
      class="checklist-checkbox"
      @click="toggleIsDone(checklist.id, item.id)"
    >
      <a class="checked-icon" />
    </div>
    <div class="item-title">{{ item.title }}</div>
  </div>

  <div class="add-checklist-item-form">
  <input
    class="add-checklist-item-input"
    type="text"
    v-focus
    placeholder="Add an item"
    v-model="checklistItemTitle"
  />
  <button @click="addChecklistItem(checklist.id)" class="add-button">Add</button
  ><a class="close-checklist-icon"></a>
  </div>

</template>

<script>
export default {
  props: {
    checklist: Object,
  },
  date() {
    return {
      checklistItemTitle: "",
    };
  },
  methods: {
    addChecklistItem(checklistId) {
      this.$emit("addChecklistItem", checklistId, this.checklistItemTitle);
      this.checklistItemTitle = "";
    },
    toggleIsDone(checklistId, itemId) {
      this.$emit("toggleIsDone", checklistId, itemId);
    },
    isItemDone(item) {
      return item.isDone ? "done" : "";
    },
  },
};
</script>

<style>
</style>