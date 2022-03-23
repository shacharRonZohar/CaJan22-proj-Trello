import { boardService } from '../../services/board.service.js'

export default {
    state: {
        boards: [],
        board: {}
    },
    getters: {
        boards({ boards }) {
            return boards
        },
        board({ board }) {
            return board
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        saveBoard(state, { savedBoard }) {
            // Ask adam: Maybe remove complexity
            const idx = state.boards.findIndex(currBoard => {
                return currBoard._id === savedBoard._id
            })
            if (idx !== -1) state.boards.splice(idx, 1, savedBoard)
            else state.boards.unshift(savedBoard)
        },
        setBoard(state, { boardId }) {
            console.log(boardId)
            console.log(state.boards)
            const board = state.boards.find(currBoard => currBoard._id === boardId)
            if (!board) return console.log('Couldnt find board')
            state.board = board
        }
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                commit({ type: 'setIsReady', isReady: false })
                // The timeout is for testing
                // setTimeout(async () => {
                const boards = await boardService.query()
                commit({ type: 'setBoards', boards })
                commit({ type: 'setIsReady', isReady: true })
                // }, 3000)
            } catch (err) {
                console.log(err)
            }
        },

        async saveBoard({ commit }, { boardToSave }) {
            try {
                const savedBoard = await boardService.save(boardToSave)
                commit({ type: 'saveBoard', savedBoard })
            } catch (err) {
                console.log(err)
            }
        }
    },
}