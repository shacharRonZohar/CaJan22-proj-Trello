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
        loadUser({ commit }) {
            const user = userService.getLoggedInUser()
            commit({ type: 'setLoggedInUser', user })
        }
    },
}