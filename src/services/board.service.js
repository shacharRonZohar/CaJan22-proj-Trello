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
    saveGroupDrop,
    saveCover,
    toggleLabel,
    saveNewLabel
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
    console.log(task)
    return Promise.resolve(board)
}

function saveCover(board, taskId, groupId, payload, activity) {
    let cover = {
        backgroundColor: payload.thing
    }
    if (payload.type !== 'color') {
        cover = {
            backgroundImage: `url(${payload.thing})`
        }
    }
    // const cover = {
    //     background: `${payload.thing} no-repeat center`
    // }
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    task.cover = cover
    return Promise.resolve(board)
}

function toggleLabel(board, taskId, groupId, payload, activity) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    if (task.labelIds?.length) {
        const idx = task.labelIds.findIndex(label => label === payload)
        if (idx !== -1) task.labelIds.splice(idx, 1)
        else task.labelIds.push(payload)
    } else {
        task.labelIds = [payload]
    }
    return Promise.resolve(board)
}

function saveNewLabel(board, payload, activity) {
    payload.id = utilService.makeId('l')
    board.labels.unshift(payload)
    return Promise.resolve({ boardToSave: board, id: payload.id })
}

function _getAttachment(payload) {
    const nameStartIdx = payload.lastIndexOf('/') + 1
    const nameEndIdx = payload.lastIndexOf('_')
    const extension = payload.substring(/\.(png|jpg|gif|bmp|jpeg|PNG|JPG|GIF|BMP|JPEG)/.exec(payload).index)
    // const nameEndIdx =

    const name = payload.substring(nameStartIdx, nameEndIdx) + extension
    return {
        id: utilService.makeId('a'),
        url: payload,
        name,
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
            'labels': [
                {
                    "id": "l101",
                    "title": "Done",
                    "color": "#61bd4f"
                },
                {
                    "id": "l102",
                    "title": "Progress",
                    "color": "#f2d600"
                },
                {
                    "id": "l103",
                    "title": "Low priority",
                    "color": "#ff9f1a"
                },
                {
                    "id": "l104",
                    "title": "Medium priority",
                    "color": "#eb5a46"
                },
                {
                    "id": "l105",
                    "title": "High priority",
                    "color": "#c377e0"
                },
                {
                    "id": "l106",
                    "title": "All",
                    "color": "#0079bf"
                },

            ],
            'members': [],
            'groups': [
                {
                    'id': utilService.makeId('g'),
                    'title': 'Group 1',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Replace logo',
                            'labelIds': ['l101', 'l102']
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
                            'title': 'Replace logo',
                            "labelIds": ["l103", "l104"]
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add Samples',
                            "labelIds": ["l103"]
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
                            'title': 'Add Samples',
                            "labelIds": ["l103", "l104"]
                        }
                    ],
                    'style': {}
                }
            ]
        }]
        utilService.save(BOARDS_KEY, boards)
    }
}