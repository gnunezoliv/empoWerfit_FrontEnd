document.addEventListener("DOMContentLoaded", function () {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  console.log("ID del producto desde la URL:", productId);

  // Verificar si se obtuvieron parámetros correctamente
  if (!productId) {
    document.getElementById("producto-detail").innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  fetch("/sources/items/items.json")
    .then(response => response.json())
    .then(data => {
      const productos = data;
      console.log("Todos los productos:", productos);

      // Buscar el producto por el ID
      const producto = productos.find(p => p.id === productId);
      console.log("Producto seleccionado:", producto);

      if (producto) {
        const name = producto.name || "Nombre no disponible";
        const image = producto.image || 'https://via.placeholder.com/150';
        const price = producto.price || "Precio no disponible";
        const category = producto.category || "Categoria no disponible";
        const description = producto.description || "Descripcion no disponible";

        const detailContainer = document.getElementById("producto-detail");
        detailContainer.innerHTML = /*`
              <div class="card">         
                <img src="${image}" class="card-img-top" alt="${name}" style="height: 500px; width: 500px; object-fit: cover;">
                <div class="card-body product-info text-center pb-2">
                 
                  <h1 class="card-title product-name mt-3 mb-1"><span class="d-inline-block" style="max-width: 250px;">${name}</span></h1>
                  <h2 class="card-text product-price">$${price} MXN</h2>

                  ${description ? `<h3 class="card-text mb-2"><small class="d-inline-block" style="max-width: 270px;">${description}</small></h3>` : ''}
                  
                   <p class="card-text product-category">${category}</p>
                </div>
                <div class="card-footer d-flex justify-content-evenly mb-3">
                  
                
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary">Agregar a mi bolsa</button>
                    <button type="button" class="btn btn-outline-primary"><i class="bi bi-heart-fill"></i></button>
                  </div>

                </div>
              </div>
            `;*/

          `
            <div class="container mt-5">
              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <img src="${image}" class="card-img-top" alt="${name}" style="height: 500px; width: 100%; object-fit: cover;">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card-body product-info text-center pb-2">
                    <h1 class="card-title product-name mt-3 mb-1">
                      <span class="d-inline-block" style="max-width: 250px;">${name}</span>
                    </h1>
                    <h2 class="card-text product-price">$${price} MXN</h2></br>
                    <p class="card-text product-category">${category}</p></br>
                    
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary">Agregar a mi bolsa</button>
                      <button type="button" class="btn btn-outline-primary"><i class="bi bi-heart-fill"></i></button>
                    </div>
                  </div>
                </div>  
              </div>
              
              <div class="row">
                <div class="card-footer d-flex justify-content-start mb-3">
                   ${description ? `<h3 class="card-text mb-2"><small style="max-width: 270px;">Descripción del Producto: </br> ${description}</small></h3>` : ''}


                   
                </div>
              </div>
              
            </div>
          `;

        /*
        `<h1>${name}</h1>
                  <img src="${image}" alt="${name}" style="max-width: 100%; height: auto;">
                  <p><strong>Price: </strong>$${price} MXN</p>
                  <p><strong>Category: </strong>${category}</p>
                  <p>${description}</p>
              `;*/
      } else {
        document.getElementById("producto-detail").innerHTML = "<p>Producto no encontrado.</p>";
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos del producto:", error);
      document.getElementById("producto-detail").innerHTML = "<p>Hubo un error al cargar el producto.</p>";
    });
});
