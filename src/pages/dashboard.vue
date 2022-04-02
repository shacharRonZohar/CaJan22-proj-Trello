<template>
    <section class="dashboard-container" 
    :style="{ backgroundImage: `url(${img})`, backgroundColor: `${color}` }"
    >
        <div class="dashboard">
            this is dashboard
            <!-- <pre>{{ board }}</pre> -->
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mutations: {

    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        img() {
            return this.board.style?.imgUrl || ''
        },
        color() {
            return this.board.style.color
                ? this.board.style.color
                : ""
        },
    },

}
</script>