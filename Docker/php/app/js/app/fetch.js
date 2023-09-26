const fetchClass = {
    async post(url, data, auth = false) {
        let headers = {
            "Content-Type": "application/json"
        };
        if (auth) {
            const token = storage.get(storageKeyToken);
            headers.Authorization = 'Bearer ' + token;
        }
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;      
    },
    async get(url) {
        return await fetch(url);
    }
}