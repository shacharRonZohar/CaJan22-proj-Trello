<template >
    <section @click.stop class="checklist-container">
     <form @submit.prevent="addChecklist" class="checklist-form flex">
         <label>
             Title
        <input type="text" class="checklist-title-input" v-focus v-model="title" />
         </label>
        <button class="add-checklist-btn">Add</button>       
     </form>
    </section>
</template>

<script>

export default {
    emits: ['action'],
    components: {
    },
    created() { },
    data() {
        return {          
                title:'checklist',
        }
    },
    methods: {
    addChecklist(){
        this.$emit('action', {cbName:'addChecklist' , payload: this.title})
        this.$emit('togglePopup')
    }
    },
    computed: {},
    unmounted() { },
}
</script>