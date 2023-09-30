    /**
     * Define api base url to reuse everywhere
     */
    let apiUrl = 'http://localhost:3000';

    let collection = 'products';

    const updateCollectionsName = () => {
        const collectionNameElements = document.querySelectorAll('.collection-name');;
        collectionNameElements.forEach(element => {
            element.innerText = collection;
        });
    }

    document.getElementById('collectionApiUrl').addEventListener('click', function () {
        collection = document.getElementById('collection').value;
        const alertEL = document.getElementById('collectionChanged');
        alertEL.innerHTML = `
            collection changed to ${collection}
        `;
        alertEL.style.display = 'block';
        updateCollectionsName();
    });

    document.getElementById('updateApiUrl').addEventListener('click', function () {
        apiUrl = document.getElementById('apiUrl').value;
        const alertEL = document.getElementById('apiUrlChanged');
        alertEL.innerHTML = `
            apiUrl changed to ${apiUrl}
        `;
        alertEL.style.display = 'block';
    });

    /**
     * setInputValue function to easily set an element value
     * receives a selector (id, class, etc) and a new value
     */
    function setInputValue(selector, value) {
        const el = document.querySelector(selector);
        if (el) {
            el.value = value;
        }
    }

    /**
     * setRandomUpdateValues uses faker to create random data that will be used to insert new products
     */
    function setRandomUpdateValues() {
        setInputValue('#exampleInputName', faker.commerce.product());
        setInputValue('#exampleInputPrice', faker.commerce.price());
        setInputValue('#exampleInputTags', faker.hacker.noun());
    }
    /**
     * Call setRandomUpdateValues to set the initial random values
     */
    setRandomUpdateValues();

    /**
     * Add on click listener to the button in order to set new random values to insert
     */
    document.getElementById('setRandomUpdateValues').addEventListener('click', function (event) {
        setRandomUpdateValues();
    });

    /**
     * statusColor uses fetch response code to change result Status text color
     */
    async function statusColor(response, data = false) {
        const statusEl = document.getElementById("status");
        statusEl.innerHTML = `${response.status} ${response.statusText}`;
        statusEl.classList = [];
        if (response.status >= "200" && response.status < "300") {
            statusEl.classList.add("text-success");
        } else {
            statusEl.classList.add("text-danger");
        }
        results.innerText = data ? JSON.stringify(data, null, 2): '';
    }

    /**
     * getProducts function call api, get products, and return products result to be reused 
     */
    async function getProducts() {
        return await fetch(`${apiUrl}/${collection}`);
    }

    async function updateProductIds() {
        const response = await getProducts();
        const products = await response.json();
        const prodsEl = document.querySelector('#products-id-list');
        prodsEl.innerHTML = '';
        products.forEach(element => {
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

    document.querySelector('#fetchCall1').addEventListener('click', async function (event) {
        const response = await getProducts();
        const products = await response.json();
        statusColor(response, products);
    });

    document.querySelector('#fetchCallError').addEventListener('click', async function (event) {
        const response = await fetch('/user/12345');
        if (!response.ok) {
            results.innerText = '';
            const status = {
                status: response.status,
                statusText: response.statusText
            };
            statusColor(status);
        }
    });

    function elementValue(selector) {
        const el = document.querySelector(selector);
        if (el) {
            return el.value;
        } else {
            return faker.commerce.product()   
        }
    }

    document.querySelector('#fetchWithParams').addEventListener('click', async function (event) {
        const params = new FormData();
        params.append('name', faker.commerce.product());
        params.append('price', faker.commerce.price());
        params.append('tags', faker.hacker.noun());

        const result = await fetch(`${apiUrl}/${collection}`, {
            method: 'POST',
            body: params
        });
        const data = await result.json();
        statusColor(result, data);
        updateProductIds();
    });

    document.querySelector('#fetchDelete').addEventListener('click', async function (event) {
        const response = await getProducts();
        const products = await response.json();
        const lastProduct = products[products.length - 1];
        const deleteUrl = `${apiUrl}/${collection}/${lastProduct.id}`;
        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE'
        });
        statusColor(deleteResponse);
        updateProductIds();
    });

    document.querySelector('#fetchWithParamsJson').addEventListener('click', async function (event) {
        const params = {
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            tags: faker.hacker.noun()
        };
        const response = await fetch(`${apiUrl}/${collection}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        statusColor(response, data);
        updateProductIds();
    });

    document.querySelector('#fetchUpdate').addEventListener('click', async function (event) {
        const response = await getProducts();
        const products = await response.json();
        const lastProduct = products[products.length - 1];
        elementValue('#exampleInputTags')
        const params = {
            name: elementValue('#exampleInputName'),
            price: elementValue('#exampleInputPrice'),
            tags: elementValue('#exampleInputPrice')
        };
        const onProductResponse = await fetch(`${apiUrl}/${collection}/${lastProduct.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        const newProduct = await onProductResponse.json();
        statusColor(response, newProduct);
        updateProductIds();
    });

    document.getElementById('fetchDeleteById').addEventListener('click', async function(event) {
        const id = document.querySelector('#products-id-list').value;
        const response = await fetch(`${apiUrl}/${collection}/${id}`, {
            method: 'DELETE'
        });
        statusColor(response);
        updateProductIds();
    });