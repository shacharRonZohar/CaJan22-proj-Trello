<template >
    <div @click.stop class="dates">
        <Datepicker v-model="date" inline autoApply />
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['action'],
    components: {
    },
    created() { },
    setup() {
        const date = ref(new Date())

        return {
            date,
        }
    },
    mounted() {
        console.log(this.date)
    },
    methods: {
        test(){
            console.log(arguments);
        },
        onDates() {
            // this.$emit('onAction', 'lableTask')
        }
    },
    computed: {},
    unmounted() { },
}
</script>