<template >
  <!-- TODO: Need to split code into more components -->
  <div class="task-details-container">
    <section @click.stop v-if="task" class="task-details">
      <div @click.stop="onCloseDetails" class="clickable-background"></div>
      <div v-if="task.cover" :style="task.cover" class="cover"></div>
      <header class="task-details-header">
        <div class="icon"></div>
        <div class="title-container">
          <h2 @blur="onSaveTitle" class="title" contenteditable spellcheck="false">{{ task.title }}</h2>
          <div class="group-txt">
            in list:
            <span>{{ groupName }}</span>
          </div>
        </div>
      </header>
      <main class="main-details">
        <section class="main-content">
          <!-- <div class="members-container task-layout">
          <span>Members:</span>
          <div class="members">
            <div class="member">A</div>
            <div class="member">CB</div>
            <div class="member">SZ</div>
            <div class="member add icon"></div>
          </div>
          </div>-->
          <ul v-if="task.labelIds?.length" class="labels-container">
            <li
              class="label"
              v-for="label in task.labelIds"
              :style="{ backgroundColor: getLabelById(label).color }"
            >{{ getLabelById(label).title }}</li>
          </ul>
          <div class="description-container">
            <div class="description-header">
              <div class="icon"></div>
              <h3>Description</h3>
            </div>
            <div @click.stop="toggleDescEdit" v-if="!descEditOpen" class="description task-layout">
              <span>{{ descTxt }}</span>
            </div>
            <form class="description-edit-form task-layout" v-else @submit.prevent="onSaveDesc">
              <textarea
                v-focus
                class="description-edit"
                v-model="newDesc"
                placeholder="Add a more detailed description..."
              ></textarea>
              <div class="desc-actions">
                <button class="save-new-list-btn">Save</button>
                <button @click.stop="toggleDescEdit" class="icon close"></button>
              </div>
              <!-- <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span> -->
            </form>
            <!-- <button class="btn edit">Edit</button> -->
          </div>
          <div v-if="task.attachments && task.attachments.length" class="attachments-container">
            <div class="attachments-header">
              <div class="icon"></div>
              <h3>Attachments</h3>
            </div>
            <div
              class="attachment-thumbnail task-layout"
              v-for="attachment in task.attachments"
              :key="attachment.id"
            >
              <div class="img-container">
                <img :src="attachment.url" alt />
              </div>
              <div class="attachment-details">
                <span class="name">
                  {{ attachment.name }}
                  <a class="attachment-name-icon"></a>
                </span>
                <div class="attachment-actions">
                  <span>Added {{ getTime(attachment.createdAt) }} -</span>
                  <small class="attacment-delete" @click="onRemoveAttachment(attachment.id)">Delete</small>
                  <div class="attacment-make-cover">
                    <a class="make-cover-icon" />
                    <span
                      class="attacment-cover-title"
                      @click="onMakeCover(attachment.url)"
                    >Make cover</span>
                  </div>
                </div>
              </div>
            </div>
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
          <div class="placeholder"></div>
          <component
            :chosenLabels="task.labelIds"
            @togglePopup="setPopupMode"
            @onAction="onAction"
            @onActions="onActions"
            v-for="cmp in actionCmps"
            :is="cmp"
            :class="open"
          ></component>
        </aside>
      </main>
      <button @click="onCloseDetails" class="btn close icon"></button>
    </section>
  </div>
</template>

<script>
import archiveAction from "./archive-action.vue"
import membersAction from "./members-action.vue"
import attachmentAction from "./attachment-action.vue"
import labelAction from "./lables-action.vue"
import checklistAction from "./checklist-action.vue"
import datesAction from "./dates-action.vue"
import locationAction from "./location-action.vue"
import coverAction from "./cover-action.vue"
import moment from 'moment'

export default {
  props: {
    groupId: String,
  },
  components: {
    archiveAction,
    membersAction,
    attachmentAction,
    labelAction,
    checklistAction,
    datesAction,
    coverAction,
    locationAction,
  },
  created() {
    console.log(moment().toNow(1648319551701))
  },
  data() {
    return {
      task: null,
      descEditOpen: false,
      isActionPopupOpen: false,
      newDesc: "",
      localGroupId: null,
      groupName: "",
      isActionPopupOpen: false,
      actionCmps: [
        "members-action",
        "label-action",
        "checklist-action",
        ,
        "dates-action",
        "location-action",
        "attachment-action",
        "cover-action",
        "archive-action",
      ],
      // actionCmps: ['archive-action']
    }
  },
  watch: {
    taskId: {
      async handler() {
        try {
          if (!this.$route.params?.taskId) return
          const taskId = this.$route.params.taskId
          const group = await this.$store.dispatch({
            type: "getGroupByTask",
            taskId,
          })
          this.localGroupId = group.id
          this.groupName = group.title
          this.task = await this.$store.dispatch({
            type: "getTaskById",
            taskId,
            groupId: this.groupId || this.localGroupId,
          })
        } catch (err) {
          console.log(err)
        }
      },
      immediate: true,
    },
  },
  methods: {
    async saveTask(taskToSave) {
      taskToSave = JSON.parse(JSON.stringify(taskToSave))
      return this.$store.dispatch({
        type: "saveTask",
        taskToSave,
        groupId: this.groupId || this.localGroupId,
      })
    },
    async onRemoveAttachment(attachmentId) {
      const idx = this.task.attachments.findIndex(
        (attachment) => attachment.id === attachmentId
      )
      this.task.attachments.splice(idx, 1)
      if (this.task.cover) delete this.task.cover
      this.saveTask(this.task)
    },
    async onAction({ cbName, payload = null }) {
      await this.$store.dispatch({
        type: cbName,
        taskId: this.task.id,
        groupId: this.localGroupId,
        payload,
      })
      // Temporary
      const taskId = this.$route.params.taskId
      this.task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
        groupId: this.groupId || this.localGroupId,
      })
    },
    async onActions(actions) {
      // Plaster
      await this.$store.dispatch({
        type: actions[0].cbName,
        taskId: this.task.id,
        groupId: this.localGroupId,
        payload: actions[0].payload,
      })
      await this.$store.dispatch({
        type: actions[1].cbName,
        taskId: this.task.id,
        groupId: this.localGroupId,
        payload: actions[1].payload,
      })
      const taskId = this.$route.params.taskId
      this.task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
        groupId: this.groupId || this.localGroupId,
      })
    },
    async onSaveTitle(ev) {
      this.task.title = ev.target.innerText
      await this.saveTask(this.task)
    },
    async onSaveDesc() {
      this.task.description = this.newDesc
      await this.saveTask(this.task)
      this.toggleDescEdit()
    },
    onMakeCover(url) {
      this.onAction({
        cbName: "chooseCover",
        payload: { type: "img", style: url },
      })
    },
    onCloseDetails() {
      const currRoute = this.$route.fullPath
      const route = currRoute.substring(0, currRoute.indexOf("/task"))
      this.$router.push(route)
    },
    toggleDescEdit() {
      this.newDesc = this.task.description
      this.descEditOpen = !this.descEditOpen
    },
    setPopupMode(isOpen) {
      console.log(isOpen)
      this.isActionPopupOpen = isOpen
    },
    getLabelById(id) {
      return this.$store.getters.labelById(id)
    },
    getTime(date) {
      // console.log(date)
      return moment(+date).fromNow()
    }
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    },
    descTxt() {
      return "description" in this.task && this.task.description
        ? this.task.description
        : "Add a more detailed description..."
    },
    open() {
      return { open: this.isActionPopupOpen }
    },
  },
  unmounted() { },
}
</script>