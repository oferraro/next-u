const fetchClass = {
    async post(url, data) {
        console.log('data', data);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;      
    }
}