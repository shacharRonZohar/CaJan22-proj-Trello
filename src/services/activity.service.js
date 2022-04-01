import { utilService } from './util.service.js'
import { userService } from './user-service.js'

export const activityService = {
    add,
    getActivityTxt
}
const endpoint = 'board/activity'

function _createActivity({ type, itemName, containerName = '', ids = { boardId: '', groupId: '', taskId: '' }, }) {
    // @Params: 
    // user = loggedInUser
    // type = The action preformed by the user
    // containerName = The containerName for the item that changed
    // itemName = The item that changed
    // ids = An object that hold the diffrent ids used for identifying the activity

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

function add(payload) {
    console.log('from addActivity in activity-service: ', payload)
    const activity = _createActivity(payload)
    payload.board.activities?.length ? payload.board.activities.push(activity) : payload.board.activities = [activity]
    return Promise.resolve(payload.board)
    // const activity = _createActivity(payload)
    // board.activities ? board.activities.push(activity) : board.activities = [activity]
}

function getActivityTxt(activity, entity) {
    let txt = `${activity.user?.fullname} ${activity.type} `
    if (activity.type === 'renamed') return txt += `this ${entity}`
    // if () return txt += `this ${entity}`
    return txt += `${activity.type === 'added' && entity === 'card' ?
        `this ${entity}` :
        activity.itemName} 
    ${activity.type === 'added' ? 'to' : 'from'} ${activity.containerName}`
}