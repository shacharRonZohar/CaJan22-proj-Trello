<template>
    <div v-if="isLoading" class="loading-container">Loading</div>
    <div v-else-if="isTryAgain" class="tryAgain-container">TryAgain</div>
    <div v-else-if="isRecording" class="recording-container">Recording</div>
    <div @click="toggleSr" :class="recording" class="recorder-container">
        <div :class="recording" class="outer"></div>
        <div :class="recording" class="outer-2"></div>
        <div :class="recording" class="icon-microphone">R</div>
    </div>
</template>   
<script>

export default {
    data() {
        return {
            isTryAgain: false,
            isRecording: false,
            isLoading: false,
            sr: null
        }
    },
    methods: {
        toggleSr() {
            this.isRecording = !this.isRecording
            if (this.isRecording) return this.startSr()
            this.sr.abort()
        },
        startSr() {
            const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
            this.sr = new Recognition()
            this.sr.continuous = true
            this.sr.lang = 'he-IL'
            this.sr.onstart = () => {
                console.log('sr started')
            }
            this.sr.onend = () => {
                console.log('sr stopped')
                this.isRecording = false
            }
            this.sr.onresult = async (ev) => {
                this.isLoading = true
                const results = ev.results
                for (let result in results) {
                    for (let key in results[result]) {
                        const transcript = results[result][key]?.transcript
                        if (typeof transcript === 'string' &&
                            transcript.includes('תיכנס') &&
                            transcript.includes('ל')) {
                            console.log('match!')
                            try {
                                const query = transcript.substring(transcript.indexOf('ל') + 1).trim()
                                // console.log(query)
                                console.log('Finding: ', query)
                                const boardId = await this.$store.dispatch({ type: 'boardIdByName', query })
                                this.isLoading = false
                                this.sr.stop()
                                if (!boardId) return this.isTryAgain = true
                                this.$router.push(`/board/${boardId}`)
                                return this.isTryAgain = false
                            } catch (err) {
                                this.isTryAgain = true
                            }
                        }
                    }
                    this.sr.stop()
                    return this.isTryAgain = true
                }
            }
            this.sr.start()
            this.isRecording = true
        }
    },
    computed: {
        recording() {
            return { 'recording': this.isRecording }
        }
    }
}
</script>     
<style scoped>
.recorder-container {
    cursor: pointer;
    width: 150px;
    background-color: gray;
    display: block;
    margin: 50px auto 0px auto;
    border-radius: 100%;
    box-shadow: 0px 0px 15px 2px #bdc3c7;
    /* cursor: default; */
    transition: 0.3s all ease-in;
    position: relative;
}

.recorder-container.recording {
    background-color: #e74c3c;
}

.icon-microphone {
    color: #fff;
    font-size: 60px;
    line-height: 150px;
    display: block;
    text-align: center;
    transition: 0.1s all ease-in;
    position: relative;
}

.outer.recording {
    width: 148px;
    height: 148px;
    transform: scale(1);
    border-radius: 100%;
    position: absolute;
    background-color: transparent;
    border: 1px solid #7f8c8d;
    z-index: -1;
    transition: 1.5s all ease;
    animation: woong 1.5s infinite;
}

.outer-2.recording {
    width: 150px;
    height: 150px;
    transform: scale(1);
    border-radius: 100%;
    position: absolute;
    background-color: #bdc3c7;
    z-index: -1;
    transition: 1.5s all ease;
    animation: woong-2 1.5s infinite;
    animation-delay: 2.5s;
}

@keyframes woong {
    0% {
        trasform: scale(1.2);
    }

    50% {
        transform: scale(1.8);
        opacity: 0.5;
    }

    100% {
        transform: scale(2.4);
        opacity: 0;
    }
}

@keyframes woong-2 {
    0% {
        transform: scale(1.2);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.6);
        opacity: 0.5;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>