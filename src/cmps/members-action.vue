<template >
    <div @click.stop class="members-action">
        <input type="text" v-model="filterBy" placeholder="Search members" />
        <ul class="members-list clean-list">
            <li
                v-for="member in filteredMembers"
                :key="member._id"
                class="user-preview"
                @click="onAddMember(member)"
            >
                <!-- :class="isHovered(member)"
                @mouseenter.stop="toggleMemberIsHovered(member)"
                @mouseleave.stop="toggleMemberIsHovered(member)"-->
                <div
                    @mouseout.stop
                    @mouseover.stop
                    class="icon"
                    :style="{ backgroundImage: `url(${member.imgUrl})` }"
                ></div>
                <span @mouseout.stop @mouseover.stop>{{ member.fullname }}</span>
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
        // isHovered(member) {
        //     console.log(member)
        //     return { 'hover': member.isHovered }
        // },
        // toggleMemberIsHovered(member) {
        //     member.isHovered = !member.isHovered
        // }
    },
    computed: {
        // isHovered() {
        //     return member => {
        //         console.log(member.isHovered)
        //         return { 'hover': member }
        //     }
        // },
        filteredMembers() {
            return this.$store.getters.filteredMembers(this.filterBy)
        }
    },
    unmounted() { },
}
</script>