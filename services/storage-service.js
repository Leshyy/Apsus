export const storageService = {
    save,
    load,
};

function save(value, key) {
    localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
    return JSON.parse(localStorage.getItem(key));
}
