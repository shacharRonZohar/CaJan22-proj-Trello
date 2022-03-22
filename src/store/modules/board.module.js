import { boardService } from '../../services/board.service.js'

export default {
    state: {
        boards: []
    },
    getters: {
        boards({ boards }) {
            return boards
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        }
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.query()
                commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log(err)
            }
        }
    },
}