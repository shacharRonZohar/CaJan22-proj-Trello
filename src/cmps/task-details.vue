<template>
  <section v-if="task" class="task-details-container">
    <!-- <div class="clickable-background"></div> -->
    <!-- @input.stop -->
    <header class="task-details-header">
      <!-- <div class="title-container"> -->
      <div class="icon"></div>
      <div class="title-container">
        <h2 @blur="onSaveTitle" class="title" contenteditable spellcheck="false">{{ task.title }}</h2>
        <small class="group-txt">
          in list:
          <span>Frontend</span>
        </small>
      </div>
    </header>
    <main class="main-details">
      <section class="main-content">
        <div class="members-container task-layout">
          <span>Members:</span>
          <div class="members">
            <div class="member">A</div>
            <div class="member">CB</div>
            <div class="member">SZ</div>
            <div class="member add icon"></div>
          </div>
        </div>
        <div class="desc-container">
          <div class="desc-header">
            <div class="icon"></div>
            <h3>Description</h3>
          </div>

          <div
            @click.stop="toggleDescEdit"
            v-if="!descEditOpen"
            class="desc task-layout"
          >{{ descTxt }}</div>
          <form class="desc-edit-form" v-else @submit.prevent="onSaveDesc">
            <textarea
              class="desc-edit"
              v-model="newDesc"
              resize:none
              placeholder="Add a more detailed description..."
            ></textarea>
            <button class="save-new-list-btn">Save</button>
            <!-- <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span> -->
          </form>
          <!-- <button class="btn edit">Edit</button> -->
        </div>
        <div class="activities-container">
          <div class="activities-header">
            <div>
              <div class="icon"></div>
              <h3>Activity</h3>
            </div>
            <button class="btn show">Show details</button>
          </div>
        </div>
      </section>
      <aside class="actions">
        <h3>Add to card</h3>
        <!-- All btns gonna be dynamic components -->
        <div class="members btn">
          <div class="icon"></div>
          <button class="members">Members</button>
        </div>
        <div class="lables btn">
          <div class="icon"></div>
          <button class="lables">Lables</button>
        </div>
        <div class="checklist btn">
          <div class="icon"></div>
          <button class="checklist">Checklist</button>
        </div>
        <div class="dates btn">
          <div class="icon"></div>
          <button class="dates">Dates</button>
        </div>
        <div @click="toggleActionPopup" class="attachment btn">
          <!-- Gonna be a dynamic component -->
          <div v-if="actionPopupOpen" class="action-popup">This is an action popup</div>
          <div class="icon"></div>
          <button class="attachment">Attachment</button>
        </div>
        <div class="cover btn">
          <div class="icon"></div>
          <button class="cover">Cover</button>
        </div>
      </aside>
    </main>
    <button @click="onCloseDetails" class="btn close icon"></button>
    <!-- <p class="description">Description</p> -->
  </section>
</template>

<script>
export default {
  props: {
    groupId: String
  },
  components: {},
  created() { },
  data() {
    return {
      task: null,
      descEditOpen: false,
      actionPopupOpen: false,
      newDesc: ''
    }
  },
  watch: {
    taskId: {
      async handler() {
        try {
          if (!this.$route.params?.taskId) return
          const taskId = this.$route.params.taskId
          this.task = await this.$store.dispatch({ type: 'getTaskById', taskId, groupId: this.groupId })
        } catch (err) {
          console.log(err)
        }
      },
      immediate: true
    }
  },
  methods: {
    async onSaveTitle(ev) {
      this.task.title = ev.target.innerText
      await this.$store.dispatch({ type: 'saveTask', taskToSave: JSON.parse(JSON.stringify(this.task)), groupId: this.groupId })
      // this.task = await this.$store.dispatch({ type: 'getTaskById', taskId: this.task.id })
      console.log(this.task)
    },
    async onSaveDesc() {
      this.task.desc = this.newDesc
      await this.$store.dispatch({ type: 'saveTask', taskToSave: JSON.parse(JSON.stringify(this.task)), groupId: this.groupId })
      this.toggleDescEdit()
    },
    onCloseDetails() {
      const currRoute = this.$route.fullPath
      const route = currRoute.substring(0, currRoute.indexOf('/task'))
      this.$router.push(route)
    },
    toggleDescEdit() {
      this.newDesc = this.task.desc
      this.descEditOpen = !this.descEditOpen
    },
    toggleActionPopup() {
      console.log(this.actionPopupOpen)
      this.actionPopupOpen = !this.actionPopupOpen
    }
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    },
    descTxt() {
      return 'desc' in this.task && this.task.desc ? this.task.desc : 'Add a more detailed description...'
    }
  },
  unmounted() { },
}
</script>