<template>
  <section class="board-list-container">
    <add-board v-if="createMenuOpen" @addedBoard="toggleNewBoard"/>

  <div class="flex align">
      <a class="board-list-strred-icon"></a>
      <span>Starred boards</span>
    </div>
    <ul class="board-list clean-list">
      <!-- <li v-for="board in starredBoards" :key="board._id"> -->
      <board-preview v-for="starredBoard in starredBoards" :key="starredBoard._id" :board="starredBoard" />
      <!-- <li class="add-new-board" @click="toggleNewBoard">
        <div class="add-bord-container">
          <p>Create new board</p>
        </div>
      </li> -->
      <!-- </li> -->
    </ul>

    <div class="flex align">
      <a class="board-list-title-icon"></a>
      <span>Your boards</span>
    </div>
    <ul class="board-list clean-list">
      <!-- <li v-for="board in boards" :key="board._id"> -->
      <board-preview v-for="board in boards" :key="board._id" :board="board" />
      <li class="add-new-board" @click="toggleNewBoard">
        <div class="add-bord-container">
          <p>Create new board</p>
        </div>
      </li>
      <!-- </li> -->
    </ul>

  </section>
</template>

<script>
import boardPreview from "./board-preview.vue";
import addBoard from './add-board.vue'
import AddBoard from "./add-board.vue";
export default {
  props: {
    boards: {
      type: Array,
    },
  },
  components: {
    boardPreview,
    addBoard,
    AddBoard
},
  data() {
    return {
      createMenuOpen: false
    };
  },
  created() {},
  methods: {
    toggleNewBoard(){
      this.createMenuOpen =! this.createMenuOpen
    }
  },
  computed: {
    starredBoards(){
      return this.$store.getters.starredBoards
    }
  },
};
</script>

<style>
</style>