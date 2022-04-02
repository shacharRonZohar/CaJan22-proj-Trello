import { activityService } from '../../services/activity.service.js'
import { boardService } from '../../services/board.service.js'
import { socketService } from '../../services/socket.service.js'

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
        labels({ board }) {
            return JSON.parse(JSON.stringify(board.labels))
        },
        labelById: ({ board }) => (id) => {
            return JSON.parse(JSON.stringify(board.labels.find(label => label.id === id)))
        },
        filteredMembers: ({ board }) => (filterBy) => {
            const regex = new RegExp(filterBy)
            return JSON.parse(JSON.stringify(board.members.filter(member => {
                return regex.test(member.username) || regex.test(member.fullname)
            })))
        },
        starredBoards(state, getters, rootState) {
            return JSON.parse(JSON.stringify(state.boards
                .filter(board => {
                    return board.starredBy?.includes(rootState.userModule.loggedInUser._id)
                })
            ))
        },
        activitiesByTask: (state) => (taskId) => {
            return JSON.parse(JSON.stringify(state.board.activities.filter(activity => {
                return activity.ids.taskId === taskId
            })))
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        saveBoard(state, { savedBoard }) {
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
        async loadBoards({ commit, rootState }) {
            try {
                const boards = await boardService.query({ user: rootState.userModule.loggedInUser })
                commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log(err)
            }
        },
        async saveBoard({ commit }, { boardToSave, isFromSocket = false }) {
            try {
                const savedBoard = await boardService.save(boardToSave)
                commit({ type: 'saveBoard', savedBoard })
                commit({ type: 'setBoard', boardId: boardToSave._id })
                if (!isFromSocket) socketService.emit('board-updated', savedBoard)
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
        // Almost (maybe all of these?) can be one dynamic function, see doc for a bit more details
        async saveTask({ state, dispatch, commit }, { taskToSave, groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveTask(board, taskToSave, groupId)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async saveGroup({ state, dispatch }, { groupToSave }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveGroup(board, groupToSave)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async removeGroup({ state, dispatch, commit }, { groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = boardService.removeGroup(board, groupId, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async archiveTask({ state, dispatch, commit }, { taskId, groupId, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.archiveTask(board, taskId, groupId, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async setTaskDueDate({ state, dispatch, commit }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveTaskDueDate(board, taskId, groupId, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }

        },
        async removeTaskDueDate({ state, dispatch, commit }, { taskId, groupId }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.removeTaskDueDate(board, taskId, groupId)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleTaskDone({ state, dispatch, commit }, { taskId, groupId, payload }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.toggleTaskDone(board, taskId, groupId, payload)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async uploadAttachment({ state, dispatch, commit }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveAttachment(board, taskId, groupId, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async setBackGroundImg({ state, dispatch }, { imgUrl, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                boardToSave.style.color = ''
                boardToSave.style.imgUrl = imgUrl
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async setBackGroundColor({ state, dispatch }, { color, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                boardToSave.style.imgUrl = ''
                boardToSave.style.color = color
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async saveGroupDrop({ state, dispatch, commit }, { fromIdx, toIdx }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveGroupDrop(board, fromIdx, toIdx)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async getGroupByTask({ state }, { taskId }) {
            return state.board.groups.find(group => {
                return group.tasks.find(task => task.id === taskId)
            })
        },
        async chooseCover({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.saveCover(board, taskId, groupId, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleLabel({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                console.log(taskId, groupId, payload)
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.toggleLabel(board, taskId, groupId, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async saveNewLabel({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const savedPayload = await boardService.saveNewLabel(board, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave: savedPayload.boardToSave })
                await dispatch({ type: 'toggleLabel', taskId, groupId, payload: savedPayload.id })
            } catch (err) {
                console.log(err)
            }
        },
        async removeCover({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.removeCover(board, taskId, groupId, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async addChecklist({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.addChecklist(board, taskId, groupId, payload, activity)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async addChecklistItem({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.addChecklistItem(board, taskId, groupId, payload, activity)
                console.log(boardToSave)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleIsDone({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                const group = boardToSave.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                const checklist = task.checklists.find(checklist => checklist.id === payload.checklistId)
                const item = checklist.items.find(item => item.id === payload.itemId)
                item.isDone = !item.isDone
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async removeChecklist({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                const group = boardToSave.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                const idx = task.checklists.findIndex(checklist => checklist.id === payload)
                task.checklists.splice(idx, 1)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async editChecklist({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                const group = boardToSave.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                const idx = task.checklists.findIndex(checklist => checklist.id === payload.id)
                task.checklists.splice(idx, 1, payload)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async editChecklistItem({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                const group = boardToSave.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                const checklist = task.checklists.find(checklist => checklist.id === payload.checklistId)
                const idx = checklist.items.findIndex(item => item.id === payload.itemToSave.id)
                checklist.items.splice(idx, 1, payload.itemToSave)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async addMember({ state, dispatch }, { user }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.addMember(board, user)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async removeChecklistItem({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const boardToSave = JSON.parse(JSON.stringify(state.board))
                const group = boardToSave.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                const checklist = task.checklists.find(checklist => checklist.id === payload.checklistId)
                const idx = checklist.items.findIndex(item => item.id === payload.itemId)
                checklist.items.splice(idx, 1)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async addMemberToTask({ state, dispatch }, { taskId, groupId, payload, activity }) {
            try {
                const board = JSON.parse(JSON.stringify(state.board))
                const boardToSave = await boardService.addMemberToTask(board, taskId, groupId, payload)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        },
        async starredBoardToggle({ dispatch, rootState }, { board }) {
            try {
                const userId = rootState.userModule.loggedInUser._id
                const boardToSave = await boardService.starredBoardToggle(board, userId)
                await dispatch({ type: 'saveBoard', boardToSave })
            } catch (err) {
                console.log(err)
            }
        }

    },
}