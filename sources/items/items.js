fetch('/sources/items/items.json')
    .then(response => response.json())
    .then(products => {
        const productsContainer = document.getElementById('products-container');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');
            productCard.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Categoría: ${product.category}</p>
                        <p class="card-text">Precio: $ ${product.price} MXN</p>
                        ${product.size ? `<p class="card-text">Tamaños disponibles: ${Array.isArray(product.size) ? product.size.join(', ') : product.size}</p>` : ''}
                        ${product.color ? `<p class="card-text">Colores disponibles: ${Array.isArray(product.color) ? product.color.join(', ') : product.color}</p>` : ''}
                        ${product.weight ? `<p class="card-text">Pesos disponibles: ${product.weight.join(', ')}</p>` : ''}
                        ${product.description ? `<p class="card-text">Descripción: ${product.description}</p>` : ''}
                        <p class="card-text">Stock: ${product.stock}</p>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error cargando los productos:', error));



