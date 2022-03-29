<template>
  <div class="checklist-header" v-if="checklist">
    <div class="checklist-header-title flex">
      <div class="checklist-icon" />
      <h3
        @blur="onSaveChecklistTitle"
        class="checklist-title"
        contenteditable
        spellcheck="false"
      >
        {{ checklist.title }}
      </h3>
    </div>
    <button class="delete-checklist" @click="removeChecklist(checklist.id)">
      Delete
    </button>
  </div>

  <div class="progress-bar-container">
    <div>
      <span class="progress-percentage">{{ donePercentage }}</span>
    </div>
    <div class="progress-bar">
      <div class="background-bar">
        <div
          class="front-bar"
          :class="isComplited"
          :style="{ width: donePercentage }"
        />
      </div>
    </div>
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
    <div
      @blur="onSaveItemTitle(item, $event)"
      class="item-title"
      contenteditable
      spellcheck="false"
    >
      {{ item.title }}
    </div>

    <div class="remove-modal-container">
    <span class="dots-icon-container">
    <a class="dots-icon" @click="toggleDeleteMenue" />
    </span>

    <div class="remove-item-modal" v-if="openDeleteMenu">
        <div class="remove-item-header">
            <span>Item actions</span>
            <a class="close-icon"  @click="toggleDeleteMenue" />
        </div>
        <div class="delete-item" @click="removeItem(itemId)">Delete</div>
    </div>
    </div>
    </div>

  <div class="add-checklist-item-form" v-if="isAddItemsOpen">
    <input
      class="add-checklist-item-input"
      type="text"
      v-focus
      placeholder="Add an item"
      v-model="checklistItemTitle"
    />
    <div class="flex">
      <button
        @click="addChecklistItem(checklist.id)"
        class="add-checklist-item-btn"
      >
        Add</button
      ><a class="close-checklist-icon" @click="toglleAddItems" />
    </div>
  </div>

  <button class="open-add-item-btn" v-else @click="toglleAddItems">
    Add an item
  </button>
</template>

<script>
export default {
  props: {
    checklist: Object,
    isAddItemsOpen1: Boolean,
  },
  created() {},
  data() {
    return {
      checklistItemTitle: "",
      isAddItemsOpen: false,
      openDeleteMenu: false,
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
    toglleAddItems() {
      this.isAddItemsOpen = !this.isAddItemsOpen;
    },
    removeChecklist(checklistId) {
      this.$emit("removeChecklist", checklistId);
    },
    async onSaveChecklistTitle(ev) {
      if (!ev.target.innerText) return;
      this.checklist.title = ev.target.innerText;
      this.$emit("editChecklist", this.checklist);
    },
    async onSaveItemTitle(item, ev) {
      if (!ev.target.innerText) return;
      item.title = ev.target.innerText;
      this.$emit("editChecklistItem", item, this.checklist.id);
    },
    toggleDeleteMenue(){
        this.openDeleteMenu = !this.openDeleteMenu
    }
  },
  computed: {
    donePercentage() {
      const itemsSum = this.checklist.items.length;
      const itemsDone = this.checklist.items.filter((item) => item.isDone);
      const itemsDoneSum = itemsDone.length;
      const donePercent = Math.floor((itemsDoneSum * 100) / itemsSum) || 0;
      return `${donePercent}%`;
    },
    isComplited() {
      return this.donePercentage === "100%" ? "done" : "";
    },
  },
};
</script>

<style>
</style>