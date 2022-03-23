import { createStore } from 'vuex'
import boardModule from './modules/board.module.js'

const store = createStore({
    strict: true,
    state: {
        isReady: false
    },
    getters: {
        isReady({ isReady }) {
            return isReady
        }
    },
    mutations: {
        setIsReady(state, { isReady }) {
            state.isReady = isReady
        }

    },
    actions: {},
    modules: {
        boardModule
    }
})

export default store
