import { userService } from '../../services/user-service.js'

export default {
    state: {
        loggedInUser: ''
    },
    getters: {
        loggedInUser({ loggedInUser }) {
            return loggedInUser
        }
    },
    mutations: {
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user
        }
    },
    actions: {
        async loadUser({ commit, dispatch }) {
            commit({ type: 'setIsReady', isReady: false })
            // For demo
            setTimeout(async () => {
                const user = userService.getLoggedInUser()
                commit({ type: 'setLoggedInUser', user })
                await dispatch('loadBoards')
                commit({ type: 'setIsReady', isReady: true })
            }, 1000)
        }
    },
}