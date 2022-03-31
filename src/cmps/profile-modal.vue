<template>
    <section @click.stop class="profile-modal">
        <div class="header">
            <span>Account</span>
            <span @click="onClose" class="close-profile-modal"></span>
        </div>
        <div class="user">
            <div class="profile-icon" :style="{ backgroundImage: imgUrl }"></div>
            <div class="details">
                <span class="fullname">{{ user.fullname }}</span>
                <small class="username">{{ user.username }}</small>
            </div>
        </div>
        <div class="profile-btns">
            <span class="profile-btn">Profile</span>
            <span class="activity-btn">Activity</span>
            <span class="Cards-btn">Cards</span>
        </div>
        <div @click="onLogout" class="logout">Logout</div>
    </section>
</template>

<script>
import { authService } from '../services/auth.service.js'

export default {
    props: {
        user: Object
    },
    emits: ['closeModal'],
    methods: {
        async onLogout() {
            await authService.logout()
            this.$router.push('/')
        },
        onClose() {
            this.$emit('closeModal')
        }
    },
    computed: {
        imgUrl() {
            return `url(${this.user?.imgUrl})` || ''
        }
    },
}
</script>