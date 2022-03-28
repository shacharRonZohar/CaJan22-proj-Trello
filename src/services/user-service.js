import { storageService } from './storage.service.js'

const USER_KEY = 'userLocDB'

export const userService = {
    save,
    getLoggedInUser
}

function save(user) {
    return storageService.save(USER_KEY, user)
}
function getLoggedInUser() {
    return storageService.load(USER_KEY)
}