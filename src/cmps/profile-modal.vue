<template>
    <section @click.stop class="profile-modal" @click="onLogout">
        <div class="header">Account</div>
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
// import appHeader from './components/app-header.vue'
import { authService } from '../services/auth.service.js'
export default {
    props: {
        user: Object
    },
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        onLogout() {
            authService.logout()
        }
    },
    computed: {
        imgUrl() {
            return `url(${this.user?.imgUrl})` || ''
        }
    },
    unmounted() { },
}
</script>