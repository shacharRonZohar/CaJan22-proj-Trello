<template>
  <!-- <pre>{{item}}</pre> -->
  <div v-if="item" class="checklist-checkbox" @click="toggleIsDone(item.id)">
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
    <div class="screen-toggle" @click="toggleDeleteMenue"/>
      <div class="remove-item-header">
        <span>Item actions</span>
        <a class="close-icon" @click="toggleDeleteMenue" />
      </div>
      <div class="delete-item" @click="removeItem(item.id)">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      openDeleteMenu: false,
    };
  },
  methods: {
    toggleIsDone(itemId) {
      this.$emit("toggleIsDone", itemId);
    },
    onSaveItemTitle(item, ev) {
      if (!ev.target.innerText) return;
      item.title = ev.target.innerText;
      this.$emit("onSaveItemTitle", item);
    },
    toggleDeleteMenue() {
      this.openDeleteMenu = !this.openDeleteMenu;
    },
    removeItem(itemId) {
      this.$emit("removeItem", itemId);
    },
  },
};
</script>

<style>
</style>