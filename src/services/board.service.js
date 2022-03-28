import { utilService } from './util.service.js'
import { storageService } from './async-storage.service'
import { imgService } from './imgService.js'
import { httpService } from './http-service.js'

export const boardService = {
    query,
    save,
    remove,
    saveTask,
    saveGroup,
    removeGroup,
    archiveTask,
    saveAttachment,
    saveGroupDrop,
    saveCover,
    toggleLabel,
    saveNewLabel,
    removeCover,
    getEmptyBoard,
    addChecklist
}

// const BOARDS_KEY = 'boards_db'
// _createBoards()

const endpoint = 'board'


async function query(filterBy = {}) {
    return await httpService.get(endpoint, filterBy)
    // return storageService.query(BOARDS_KEY)
}

function save(board) {
    return board._id ? _update(board) : _add(board)
}

async function remove(boardId) {
    return await httpService.remove(`${endpoint}/${boardId}`)
    // return storageService.remove(BOARDS_KEY, boardId)
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

function addChecklist(board, taskId, groupId, payload, activity) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    const checklistToAdd = {
        id: utilService.makeId('c'),
        title: payload,
        createdAt: Date.now(),
        items: []
    }
    'checklists' in task ? task.checklists.push(checklistToAdd) : task.checklists = [checklistToAdd]
    console.log(checklistToAdd);
    // return Promise.resolve(board)
}

async function saveCover(board, taskId, groupId, payload, activity) {
    let cover = {
        type: payload.type,
        backgroundColor: payload.style
    }
    if (payload.type !== 'color') {
        cover.backgroundImage = `url(${payload.style})`
        cover.backgroundColor = await imgService.getImgColor(payload.style)
    }
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

function removeCover(board, taskId, groupId, activity) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    delete task.cover
    return Promise.resolve(board)
}

function getEmptyBoard() {
    return {
        'title': '',
        'createdAt': Date.now(),
        'createdBy': {},
        'style': {},
        'labels': [
            {
                'id': 'l101',
                'title': 'Done',
                'color': '#61bd4f'
            },
            {
                'id': 'l102',
                'title': 'Progress',
                'color': '#f2d600'
            },
            {
                'id': 'l103',
                'title': 'Low priority',
                'color': '#c377e0'
            },
            {
                'id': 'l104',
                'title': 'Medium priority',
                'color': '#ff9f1a'
            },
            {
                'id': 'l105',
                'title': 'High priority',
                'color': '#eb5a46'
            },
            {
                'id': 'l106',
                'title': 'All',
                'color': '#0079bf'
            },
        ],
        'members': [],
        'groups': [],
    }
}

function _getAttachment(payload) {
    const nameStartIdx = payload.lastIndexOf('/') + 1
    const nameEndIdx = payload.lastIndexOf('_')
    const extension = payload.substring(/\.(png|jpg|gif|bmp|jpeg|PNG|JPG|GIF|BMP|JPEG)/.exec(payload).index)
    const name = payload.substring(nameStartIdx, nameEndIdx) + extension
    return {
        id: utilService.makeId('a'),
        url: payload,
        name,
        createdAt: Date.now()
    }
}
async function _update(board) {
    return await httpService.put(`${endpoint}/${board._id}`, board)
    // return storageService.put(BOARDS_KEY, board)
}

async function _add(board) {
    return await httpService.post(endpoint, board)
    // return storageService.post(BOARDS_KEY, board)
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
                    "color": "#c377e0"
                },
                {
                    "id": "l104",
                    "title": "Medium priority",
                    "color": "#ff9f1a"
                },
                {
                    "id": "l105",
                    "title": "High priority",
                    "color": "#eb5a46"
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
                    'title': 'Frontend',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Replace logo',
                            'description': "Choose name and find logo",
                            'labelIds': ['l101'],
                            'attachments': [{
                                'id': utilService.makeId('a'),
                                'createdAt': '1648319551701',
                                'name': "logo-icon.png",
                                'url': "http://res.cloudinary.com/twello/image/upload/v1648313534/logo-icon_wzlcpi.png"
                            }]
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add Libraries',
                            'cover': {
                                'backgroundImage': "url(http://res.cloudinary.com/twello/image/upload/v1648315255/Libraries_zungf8.png)"
                            },
                            'labelIds': ['l102'],
                        }
                    ],
                    'style': {}
                },
                {
                    'id': utilService.makeId('g'),
                    'title': 'Backend',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'DB collections',
                            'description': "Add board and user collections",
                            'labelIds': ['l104'],
                            'cover': { 'backgroundColor': "pink" },
                            'attachments': [{
                                'id': utilService.makeId('a'),
                                'createdAt': '1648319551701',
                                'name': "mongo-DB.png",
                                'url': "http://res.cloudinary.com/twello/image/upload/v1648314220/mongo-DB_gwdwux.png"
                            }]
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'API routes',
                            'description': "Add API routes",
                            'labelIds': ['l105'],
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Socket service',
                            'description': "Add API routes",

                        },
                    ],
                    'style': {}
                },
                {
                    'id': utilService.makeId('g'),
                    'title': 'CSS',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Planning the design',
                            'description': "Get to know the design of the Trello and understand how we would like to implement it",
                            'labelIds': ['l101'],
                            'cover': { 'backgroundImage': "url(http://res.cloudinary.com/twello/image/upload/v1648315891/design_kwnpub.jpg)" },
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add helpers',
                            'description': "Add helpers file to improve css",
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Fix design',
                            'cover': { 'backgroundColor': "red" }
                        },
                    ],
                    'style': {}
                },
                {
                    'id': utilService.makeId('g'),
                    'title': 'To do',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add checklist',
                            'description': "Add the feature in task details and preview",
                            'labelIds': ['l101', 'l105', 'l106'],
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add users',
                            'cover': { 'backgroundColor': "yellow" },
                            'description': "Add the feature in task details and preview",
                        },
                    ],
                    'style': {}
                },
                {
                    'id': utilService.makeId('g'),
                    'title': 'Done',
                    'tasks': [
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add cover',
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add labels',
                            'description': "Add color and names",
                            'labelIds': ['l102', 'l103', 'l106']
                        },
                        {
                            'id': utilService.makeId('t'),
                            'title': 'Add attachments',
                        },
                    ],
                    'style': {}
                },
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