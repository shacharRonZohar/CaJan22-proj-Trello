import { utilService } from './util.service.js'
import { storageService } from './async-storage.service'

export const boardService = {
    query
}

const BOARDS_KEY = 'boards_db'

function query() {
    return storageService.query(BOARDS_KEY)
}
_createBoards()

function _createBoards() {
    let boards = utilService.load(BOARDS_KEY)
    if (!boards || !boards.length) {
        boards = [{
            '_id': utilService.makeId('b'),
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