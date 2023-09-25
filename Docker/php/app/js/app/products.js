
const products = {
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
        return `
            <div class="card" style="width:400px">
                <div class="card-body">
                <img class="card-img-bottom" src="${product.image}" alt="Card image" style="width:100%">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.price}</p>
                    <div class="btn btn-primary">Add</div>
                    <div class="btn btn-danger">Remove</div>
                </div>
            </div>`;
    }
}