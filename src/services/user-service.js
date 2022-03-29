import { storageService } from './storage.service.js'
import { httpService } from './http-service.js'

const USER_KEY = 'userLocDB'
const endpoint = 'user'

export const userService = {
    save,
    getLoggedInUser,
    getByUsername
}

function save(user) {
    return storageService.save(USER_KEY, user)
}

function getLoggedInUser() {
    return storageService.load(USER_KEY)
}

async function getByUsername(username) {
    return await httpService.get(`${endpoint}/${username}`)
}