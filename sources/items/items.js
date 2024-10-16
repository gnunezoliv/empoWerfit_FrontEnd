fetch('/sources/items/items.json')
    .then(response => response.json())
    .then(products => {
        const productsContainer = document.getElementById('products-container');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-6', 'col-lg-4' ,'mb-4');
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.name}">
                    <div class="card-body product-info text-center pb-2">
                        <p class="card-text product-category">${product.category}</p>
                        <h4 class="card-title product-name mt-3 mb-1"><span class="d-inline-block text-truncate" style="max-width: 250px;">${product.name}</span></h4>
                        ${product.description ? `<p class="card-text mb-2"><small class="d-inline-block text-truncate" style="max-width: 270px;">${product.description}</small></p>` : ''}
                        <p class="card-text product-price">$${product.price} MXN</p>
                    </div>
                    <div class="card-footer d-flex justify-content-evenly mb-3">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary">Agregar a mi bolsa</button>
                        <button type="button" class="btn btn-outline-primary"><i class="bi bi-heart-fill"></i></button>
                      </div>
                </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error cargando los productos:', error));




