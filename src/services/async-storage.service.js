import { utilService } from '../services/util.service.js'

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType) {
    return Promise.resolve(JSON.parse(localStorage.getItem(entityType)) || [])
}

async function get(entityType, entityId) {
    const entities = await query(entityType)
    return new Promise((resolve, reject) => {
        const entity = entities.find(entity => entity._id === entityId)
        if (entity) return resolve(entity)
        reject(`Unkown Entity ${entityType} with Id: ${entityId}`)
    })
}

async function post(entityType, newEntity) {
    newEntity._id = utilService.makeExtId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return Promise.resolve(newEntity)
}

async function postMany(entityType, newEntities) {
    const entities = await query(entityType)
    entities.push(...newEntities)
    _save(entityType, entities)
    Promise.resolve(entities)
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType)
    return new Promise((resolve, reject) => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx === -1) reject(`Unkown Entity ${entityType} with Id: ${entityId}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        resolve(updatedEntity)
    })
}

async function remove(entityType, entityId) {
    const entities = await query(entityType)
    return new Promise((reject, resolve) => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx === -1) reject(`Unkown Entity ${entityType} with Id: ${entityId}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
        resolve('Removed succesfully')
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}