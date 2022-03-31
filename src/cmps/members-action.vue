<template >
    <div @click.stop class="members-action">
        <input type="text" v-model="filterBy" />
        <ul class="members-list clean-list">
            <li v-for="member in filteredMembers" class="user-preview" @click="onAddMember(member)">
                <div
                    class="icon"
                    :style="{ backgroundImage: `url(${member.imgUrl})` }"
                    :class="isHovered(member)"
                    @mouseenter="toggleMemberIsHovered(member)"
                ></div>
                {{ member.fullname }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    emits: ['action'],
    components: {
        // actionPopup
    },
    created() { },
    data() {
        return {
            filterBy: ''
        }
    },
    methods: {
        onAddMember(member) {
            this.$emit('action', { cbName: 'addMemberToTask', payload: member })
        },
    },
    computed: {
        filteredMembers() {
            return this.$store.getters.filteredMembers(this.filterBy)
        }
    },
    unmounted() { },
}
</script>