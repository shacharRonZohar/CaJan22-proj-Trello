import { utilService } from './util.service.js'
import { storageService } from './async-storage.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
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

function saveTask(board, taskToSave, activity, groupId) {
    if (groupId) {
        taskToSave.id = utilService.makeId('t')
        taskToSave.createdAt = Date.now()
        const group = board.groups.find(group => group.id === groupId)
        group.tasks.push(taskToSave)
        return board
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
            '_id': utilService.makeExtId(),
            'title': 'Trello dev proj',
            'createdAt': Date.now(),
            'createdBy': {},
            'style': {},
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
            '_id': utilService.makeExtId(),
            'title': 'Trello dev proj',
            'createdAt': Date.now(),
            'createdBy': {},
            'style': {},
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