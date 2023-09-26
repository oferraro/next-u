
const products = {
    cart: false,
    start() {
        products.cart = new Map();
        products.getCart();
        products.addCartItemsToHTML();
        products.setCartButtonAction();
    },
    setCartButtonAction() {
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                const cartListContainer = document.getElementById('cartListContainer');
                if (cartListContainer) {
                    if (cartListContainer.style.display !== 'block') {
                        cartListContainer.style.display = 'block';
                    } else {
                        cartListContainer.style.display = 'none';
                    }
                }
            });
        }
    },
    getCart() {
        const cartFromStorage = storage.getJson(storageKeyCart);
        cartFromStorage.forEach(prod => {
            products.cart.set(prod['product'].id, {product: prod.product, amount: prod.amount});
        });
    },
    addCartItemsToHTML() {
        const cartList = document.getElementById('cartList');
        if (cartList) {
            cartList.innerHTML = '';
            for (let product of products.cart.values()) {
                const productHTML = document.createElement('div');
                productHTML.setAttribute(`cart-item-${product.product.id}`, product.product.id);
                productHTML.innerHTML = products.cartProductTemplate(product);
                cartList.appendChild(productHTML);
            }
        }
    },
    async get() {
        const allProducts = await fetchClass.post(`${apiUrl}products/get.php`, {}, true);
        const productsListEl = document.getElementById('productsList');

        if (allProducts.success && allProducts.success === true) {
            allProducts.products.forEach(product => {
                const productTemplate = this.productTemplate(product);
                const productCard = document.createElement('div');
                productCard.innerHTML = productTemplate;
                productsListEl.appendChild(productCard);
            });
            
            cssClass.reloadCSS('mainCss');
        }
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
                    <div class="btn btn-danger" onclick="products.remove(${product.id})">Remove</div>
                </div>
            </div>`;
    },
    remove(id) {
        const product = products.cart.get(id);
        if (product) {
            products.cart.delete(id);
            storage.saveJson(storageKeyCart, Array.from(products.cart.values()));
            products.saveCartInBackend();
            products.addCartItemsToHTML();
        }
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
        products.saveCartInBackend();
        products.addCartItemsToHTML();
    },
    cartProductTemplate(product) {
        return `<div id="cart-item-${product.product.id}">
            <div>
            ${product.product.name} (X ${product.amount}): € ${product.amount * product.product.price}
            </div>
            <div class="actions">
                <div>
                    <span onclick="products.decrementItem(${product.product.id})">-</span>
                    <span onclick="products.incrementItem(${product.product.id})">+</span>
                </div>
                <img src="${product.product.image}" alt="${product.product.name}">
            </div>
        <div>`;
    },
    decrementItem(id) {
        const product = products.cart.get(id);
        product.amount -= 1;
        if (product && product.amount < 1) {
            products.cart.delete(id);
        } else {
            products.cart.set(id, product);
        }
        products.addCartItemsToHTML();
        storage.saveJson(storageKeyCart, Array.from(products.cart.values()));
        products.saveCartInBackend();
    },
    incrementItem(id) {
        const product = products.cart.get(id);
        product.amount += 1;
        if (product) {
            products.cart.set(id, product);
        }
        products.addCartItemsToHTML();
        storage.saveJson(storageKeyCart, Array.from(products.cart.values()));
        products.saveCartInBackend();
    },
    async saveCartInBackend() {
        const object = {};
        for (let entry of products.cart.entries()) {
            object[entry[1].product.id] = {
                product: entry[1].product,
                amount: entry[1].amount
            }
        }
        const response = await fetchClass.post(`${apiUrl}products/cart.php`, object, true);
        console.log(object);
    }
}