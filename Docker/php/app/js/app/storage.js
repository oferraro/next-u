const storage = {
    save(key, value) {
        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    get(key) {
        return localStorage.getItem(key);
    },
    saveJson(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    getJson(key) {
        return JSON.parse(this.get(key));
    }
};
