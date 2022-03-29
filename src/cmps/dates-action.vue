<template >
    <div @click.stop class="dates">
        <pre>{{date}}</pre>
        <Datepicker v-model="date" inline range autoApply />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    emits: ['action'],
    components: {
    },
    created() { },
    setup() {
        const date = ref()
        // new Date(1648446206)
        onMounted(() => {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 2));
            date.value = [startDate, endDate];
        })
        return {
            date,
        }
    },
    mounted() {
        console.log(this.date)
    },
    methods: {
        test() {
            console.log(arguments);
            console.log(this.date);
        },
        onDates() {
            // this.$emit('onAction', 'lableTask')
        }
    },
    computed: {},
    unmounted() { },
}
</script>