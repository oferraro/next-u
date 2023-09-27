    const apiUrl = 'http://localhost:3000';

    function setInputValue(selector, value) {
        const el = document.querySelector(selector);
        if (el) {
            el.value = value;
        }
    }
    function setRandomUpdateValues() {
        setInputValue('#exampleInputName', faker.commerce.product());
        setInputValue('#exampleInputPrice', faker.commerce.price());
        setInputValue('#exampleInputTags', faker.hacker.noun());
    }
    setRandomUpdateValues();

    document.getElementById('setRandomUpdateValues').addEventListener('click', function (event) {
        setRandomUpdateValues();
    });

    function statusColor(response) {
        const statusEl = document.getElementById("status");
        statusEl.innerHTML = `${response.status} ${response.statusText}`;
        statusEl.classList = [];
        if (response.status >= "200" && response.status < "300") {
            statusEl.classList.add("text-success");
        } else {
            statusEl.classList.add("text-danger");
        }
        results.innerText = response.data ? JSON.stringify(response.data, null, 2) : '';
    }

    async function getProducts() {
        return await axios.get(`${apiUrl}/products`);
    }

    async function updateProductIds() {
        const products = await getProducts();
        const prodsEl = document.querySelector('#products-id-list');
        prodsEl.innerHTML = '';
        products.data.forEach(element => {
            const prodOption = document.createElement('option');
            prodOption.innerText = `${element.id} ${element.name}`;
            prodOption.value = element.id;
            prodsEl.appendChild(prodOption);
        });
    }

    updateProductIds();

    document.querySelector('#updateProductIds').addEventListener('click', function(event) {
        updateProductIds();
    });

    document.querySelector('#axiosCall1').addEventListener('click', async function (event) {
        const response = await getProducts();
        statusColor(response);
    });

    document.querySelector('#axiosCallError').addEventListener('click', function (event) {
        axios.get('/user/12345')
        .catch(function (error) {
            results.innerText = '';
            const errorJson = error.toJSON();
            const status = {
                status: errorJson.status,
                statusText: errorJson.code
            };
            statusColor(status);
        });
    });

    function elementValue(selector) {
        const el = document.querySelector(selector);
        if (el) {
            return el.value;
        } else {
            return faker.commerce.product()   
        }
    }

    document.querySelector('#axiosWithParas').addEventListener('click', function (event) {
        const params = new URLSearchParams();
        params.append('name', faker.commerce.product());
        params.append('price', faker.commerce.price());
        params.append('tags', faker.hacker.noun());

        axios.post(`${apiUrl}/products`, params).then(response => {
            results.innerText = JSON.stringify(response.data, null, 2);
            statusColor(response);
            updateProductIds();
        });
    });

    document.querySelector('#axiosDelete').addEventListener('click', async function (event) {
        const response = await getProducts();
        const lastProduct = response.data[response.data.length - 1];
        const deleteUrl = `${apiUrl}/products/${lastProduct.id}`;
        const deleteResponse = await axios.delete(deleteUrl);
        statusColor(deleteResponse)
    });

    document.querySelector('#axiosWithParasJson').addEventListener('click', async function (event) {
        const params = {
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            tags: faker.hacker.noun()
        };
        const response = await axios.post(`${apiUrl}/products`, params);
        statusColor(response);
        updateProductIds();
    });

    document.querySelector('#axiosUpdate').addEventListener('click', async function (event) {
        const products = await getProducts();
        const lastProduct = products.data[products.data.length - 1];
        elementValue('#exampleInputTags')
        const params = {
            name: elementValue('#exampleInputName'),
            price: elementValue('#exampleInputPrice'),
            tags: elementValue('#exampleInputPrice')
        };
        const response = await axios.patch(`${apiUrl}/products/${lastProduct.id}`, params);
        statusColor(response);
    });

    document.getElementById('axiosDeleteById').addEventListener('click', async function(event) {
        const id = document.querySelector('#products-id-list').value;
        
        const response = await axios.delete(`${apiUrl}/products/${id}`);
        statusColor(response);
        updateProductIds();
    });