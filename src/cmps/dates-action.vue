<template >
    <div @click.stop class="dates-container">
        <Datepicker v-model="date" :partialRange="false" inline range autoApply />
        <div class="start-date">
            <p>Start date</p>
            <input v-model="date[0]" type="text" readonly />
        </div>
        <div class="due-date">
            <p>Due date</p>
            <input v-model="date[1]" type="text" readonly/>
        </div>
        <div class="buttons">
            <button class="save-btn btn" @click="onSave">Save</button>
            <button class="save-btn btn" @click="onSave">Remove</button>
            <!-- <button>Remove</button> -->
        </div>
    </div>
</template>

<script>
export default {
    emits: ['action'],
    data() {
        return {
            date: {
                value:[]
            }
        }
    },
    mounted() {
        this.date.value = [new Date(), new Date()];
    },
    methods: {
        onSave() {
            // console.log(this.date);
            this.$emit('action', {cbName: 'setTaskDueDate', payload: this.date})
        },
    },
    computed: {
        startDate() {
            return date.value[0].substring(0, 15)
        },
        endDate() {
            return date.value[1].substring(0, 15)
        }
    },
    unmounted() { },
}
</script>