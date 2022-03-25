<template>
    <section v-if="task" class="task-preview" @click="openTaskDetails">
        <h2>{{ task.title }}</h2>
        <div class="actions-container flex">
            <a
                v-if="task.description"
                class="description-icon"
                title="This card has a description"
            />
            <a v-if="task.attachments?.length" class="attachments-icon" title="attachments" />
            <span class="attach-num">{{ attachNum }}</span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        task: {
            type: Object
        }
    },
    components: {

    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        openTaskDetails() {
            this.$router.push(this.$route.fullPath + '/task/' + this.task.id)
            this.$emit('openTaskDetails')
        }
    },
    computed: {
        attachNum() {
            return this.task.attachments?.length
        }
    },
    unmounted() { },

}
</script>

<style>
</style>