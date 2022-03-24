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
        },
        removeGroup(state, { groupId }) {
            const idx = state.board.groups.findIndex(group => group.id === groupId)
            state.board.groups.splice(idx, 1)
         },
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
        getTaskById({ state }, { taskId, groupId }) {
            const group = state.board.groups.find(group => group.id === groupId)
            let task = group.tasks.find(task => task.id === taskId)
            task = JSON.parse(JSON.stringify(task))
            task.groupId = groupId
            return task
        },
        async saveTask({ state, dispatch, commit }, { taskToSave, groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveTask(board, taskToSave, activity, groupId)
                await dispatch({ type: 'saveBoard', boardToSave })
                commit({ type: 'setBoard', boardId: boardToSave._id })
            } catch (err) {
                console.log(err)
            }
        },
        async saveGroup({ state, dispatch, commit }, { groupToSave, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = boardService.saveGroup(board, groupToSave)
                await dispatch({ type: 'saveBoard', boardToSave })
                commit({ type: 'setBoard', boardId: boardToSave._id })
            } catch (err) {
                console.log(err)
            }
        },
        async removeGroup({ state, dispatch, commit }, { groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = boardService.removeGroup(board, groupId, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
                commit({ type: 'setBoard', boardId: boardToSave._id })
            } catch (err) {
                console.log(err)
            }
        }
    },
}