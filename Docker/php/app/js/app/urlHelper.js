
const urlHelper = {
    get(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has(name) ? urlParams.get(name) : false;
    }
}