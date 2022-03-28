function loadFromStorage(key) {
    const val = sessionStorage.getItem(key)
    return (val) ? JSON.parse(val) : null
}

function saveToStorage(key, val) {
    sessionStorage[key] = JSON.stringify(val)
}


export const storageService = {
    load: loadFromStorage,
    save: saveToStorage
}