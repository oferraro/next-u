
const products = {
    cart: false,
    start() {
        products.cart = new Map();
        products.getCart();
    },
    getCart() {
        const cartFromStorage = storage.getJson(storageKeyCart);
        cartFromStorage.forEach(prod => {
            products.cart.set(prod['product'].id, {product: prod.product, amount: prod.amount});
        });
    },
    async get() {
        const allProducts = await (await fetchClass.get(`${apiUrl}products/get.php`)).json();
        const productsListEl = document.getElementById('productsList');
        allProducts.forEach(product => {
            const productTemplate = this.productTemplate(product);
            const productCard = document.createElement('div');
            productCard.innerHTML = productTemplate;
            productsListEl.appendChild(productCard);
        });
        
        cssClass.reloadCSS('mainCss');
        return allProducts;
    },
    productTemplate(product) {
        const productString = JSON.stringify(product).replace(/"/g, '#');
        return `
            <div class="card" style="width:400px">
                <div class="card-body">
                <img class="card-img-bottom" src="${product.image}" alt="Card image" style="width:100%">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.price}</p>
                    <div class="btn btn-primary" onclick="products.addToCart('${productString}')">Add</div>
                    <div class="btn btn-danger">Remove</div>
                </div>
            </div>`;
    },
    addToCart(productSanitized) {
        const product = JSON.parse(productSanitized.replace(/#/g, '"'));
        if (products.cart.has(product.id)) {
            const existingProduct = products.cart.get(product.id);
            existingProduct.amount += 1;
            products.cart.set(product.id, existingProduct);
        } else {
            products.cart.set(product.id, {product, amount: 1});
        }
        storage.saveJson(storageKeyCart, Array.from(products.cart.values()));
    }
}