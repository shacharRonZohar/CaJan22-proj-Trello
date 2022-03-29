import { httpService } from './http-service.js'
import { userService } from './user-service.js'

export const authService = {
    login,
    logout,
    signup,
    signupWithGoogle,
    loginWithGoogle
}

// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/auth/' : '//localhost:3030/api/auth'
// console.log(BASE_URL)
const endpoint = 'auth'
async function login(cred) {
    try {
        // console.log(cred)
        const user = await httpService.post(`${endpoint}/login`, cred)
        userService.save(user)
        return Promise.resolve(user)
    } catch (err) {
        console.log('Couldnt login', err)
        throw err
    }
}

async function loginWithGoogle(cred) {
    cred.password = 'isGoogle'
    try {
        const user = await httpService.post(`${endpoint}/login`, cred)
        userService.save(user)
        return Promise.resolve(user)
    } catch (err) {
        console.log('Couldnt login with google', err)
    }
}

async function signupWithGoogle(cred) {
    cred.password = 'isGoogle'
    try {
        const user = await httpService.post(`${endpoint}/signup`, cred)
        userService.save(user)
        return Promise.resolve(user)
    } catch (err) {
        console.log('Couldnt signup with google', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(`${endpoint}/logout`)
        userService.save(null)
        return Promise.resolve()
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function signup(cred) {
    try {
        const user = await httpService.post(`${endpoint}/signup`, cred)
        userService.save(user)
        return user
    } catch (err) {
        console.log('Couldnt login', err)
        throw err
    }
}