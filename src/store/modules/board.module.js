import { boardService } from '../../services/board.service.js'

export default {
    state: {
        boards: [],
        board: {},
    },
    getters: {
        boards({ boards }) {
            return JSON.parse(JSON.stringify(boards))
        },
        board({ board }) {
            return JSON.parse(JSON.stringify(board))
        },
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
        },
        getTaskById({ state }, { taskId }) {
            let task = {}
            state.board.groups.find(group => {
                const currTask = group.tasks.find(task => task.id === taskId)
                if (currTask) return task = currTask
            })
            return JSON.parse(JSON.stringify(task))
        },
        async saveTask({ state, dispatch }, { taskToSave, groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = boardService.saveTask(board, taskToSave, activity, groupId)
                dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        }

    },
}