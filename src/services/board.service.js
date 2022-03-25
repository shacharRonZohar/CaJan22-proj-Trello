import { utilService } from './util.service.js'
import { storageService } from './async-storage.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    postMany,
    saveTask,
    saveGroup,
    removeGroup,
    archiveTask,
    saveAttachment,
    saveGroupDrop
}

const BOARDS_KEY = 'boards_db'

_createBoards()

function query() {
    return storageService.query(BOARDS_KEY)
}

function getById(boardId) {
    return storageService.get(BOARDS_KEY, boardId)
}

function save(board) {
    return board._id ? _update(board) : _add(board)
}

function postMany(boards) {
    return storageService.postMany(BOARDS_KEY, boards)
}

function remove(boardId) {
    return storageService.remove(BOARDS_KEY, boardId)
}

function removeGroup(board, groupId, activity) {
    const idx = board.groups.findIndex(group => group.id === groupId)
    if (idx === -1) console.log('group not found')
    board.groups.splice(idx, 1)
    return board
}

function saveTask(board, taskToSave, activity, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    if (!taskToSave.id) {
        taskToSave.id = utilService.makeId('t')
        taskToSave.createdAt = Date.now()
        group.tasks.push(taskToSave)
    } else {
        console.log('Im here updating!')
        const idx = group.tasks.findIndex(task => task.id === taskToSave.id)
        if (idx === -1) return Promise.reject('Couldnt find task to edit')
        group.tasks.splice(idx, 1, taskToSave)
    }
    return Promise.resolve(board)
}

function archiveTask(board, taskId, groupId, activity) {
    const group = board.groups.find(group => group.id === groupId)
    const taskIdx = group.tasks.findIndex(task => task.id === taskId)
    group.tasks.splice(taskIdx, 1)
    // console.log(board)
    return Promise.resolve(board)
}

function saveGroup(board, groupToSave, acyivity) {
    if (!groupToSave.id) {
        groupToSave.id = utilService.makeId('g')
        // groupToSave.createdAt = Date.now()
        groupToSave.tasks = []
        board.groups.push(groupToSave)
    } else {
        const idx = board.groups.findIndex(group => group.id === groupToSave.id)
        if (idx === -1) return Promise.reject('Couldnt find group to edit')
        board.groups.splice(idx, 1, groupToSave)
    }
    return board
}

function saveGroupDrop(board, fromIdx, toIdx) {
    const group = board.groups.splice(fromIdx, 1)[0]
    board.groups.splice(toIdx, 0, group)
    return Promise.resolve(board)
}

function saveAttachment(board, taskId, groupId, payload, activity) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    const attachment = _getAttachment(payload)
    'attachments' in task ? task.attachments.unshift(attachment) : task.attachments = [attachment]
    return Promise.resolve(board)
}

function _getAttachment({ url }) {
    return {
        id: utilService.makeId('a'),
        url,
        name: '',
        createdAt: Date.now
    }
}
function _update(board) {
    return storageService.put(BOARDS_KEY, board)
}

function _add(board) {
    return storageService.post(BOARDS_KEY, board)
}

function _createBoards() {
    let boards = utilService.load(BOARDS_KEY)
    if (!boards || !boards.length) {
        boards = [{
            // '_id': utilService.makeExtId(),
            '_id': 'sVCnqmVGSwPUC',
            'title': 'Trello dev proj',
            'createdAt': Date.now(),
            'createdBy': {},
            'style': {
                'imgUrl': '../assets/imgs/boardBackground/1.jpg'
            },
            'labels': [],
            'members': [],
            'groups': [
                {
                    'id': utilService.makeId('g'),
                    'title': 'Group 1',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Replace logo'
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add Samples'
                        }
                    ],
                    'style': {}
                },
                {
                    'id': utilService.makeId('g'),
                    'title': 'Group 2',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Replace logo'
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add Samples'
                        }
                    ],
                    'style': {}
                }
            ]
        },
        {
            '_id': '3g5Mc4uwKz1TQ',
            'title': 'Trello dev proj',
            'createdAt': Date.now(),
            'createdBy': {},
            'style': {
                'imgUrl': '../assets/imgs/boardBackground/2.jpg'
            },
            'labels': [],
            'members': [],
            'groups': [
                {
                    'id': utilService.makeId('g'),
                    'title': 'Group 1',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Replace logo'
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add Samples'
                        }
                    ],
                    'style': {}
                }
            ]
        }]
        utilService.save(BOARDS_KEY, boards)
    }
}