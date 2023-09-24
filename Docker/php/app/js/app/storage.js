const storage = {
    save(key, value) {
        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    get(key) {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    }
};
