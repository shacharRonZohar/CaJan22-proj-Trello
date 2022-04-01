<template >
    <div @click.stop class="dates-container">
        <Datepicker v-model="date" :partialRange="false" inline range autoApply />
        <div class="flex">
            <div class="start-date">
                <p class="lable">Start date</p>
                <!-- <input v-model="date[0]" type="text" readonly /> -->
                <p class="date">{{startDate}}</p>
            </div>
            <div class="due-date">
                <p class="lable">Due date</p>
                <!-- <input v-model="date[1]" type="text" readonly/> -->
                <p class="date">{{endDate}}</p>
            </div>
        </div>
        <div class="buttons">
            <button class="dates-btn btn" @click="onSave">Save</button>
            <button class="dates-btn btn" @click="onRemove">Remove</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    emits: ['action', 'togglePopup'],
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
            this.$emit('togglePopup')
        },
        onRemove() {
            this.$emit('action', {cbName: 'removeTaskDueDate'})
            this.$emit('togglePopup')
        }
    },
    computed: {
        startDate() {
            const start = moment(this.date[0])
            return `${start.date()}/${start.month()+1}/${start.year()}`
        },
        endDate() {
            const end = moment(this.date[1])
            return `${end.date()}/${end.month()+1}/${end.year()}`
        }
    },
    unmounted() { },
}
</script>