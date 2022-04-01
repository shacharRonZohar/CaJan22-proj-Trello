import { utilService } from './util.service.js'
import { userService } from './user-service.js'
import { httpService } from './http-service.js'

export const activityService = {
    add
}
const endpoint = 'board/activity'

function _createActivity({ type, itemName, containerName = '', ids = { boardId: '', groupId: '', taskId: '' }, }) {
    // @Params: 
    // user = loggedInUser
    // activityType = The action preformed by the user
    // item = The item that changed
    // container = The container for the item that changed
    return {
        id: utilService.makeId('a'),
        createdAt: Date.now(),
        user: userService.getLoggedInUser(),
        type,
        itemName,
        containerName,
        ids
    }

}

async function add(payload) {
    return await httpService.post(endpoint, _createActivity(payload))
    // const activity = _createActivity(payload)
    // board.activities ? board.activities.push(activity) : board.activities = [activity]
}