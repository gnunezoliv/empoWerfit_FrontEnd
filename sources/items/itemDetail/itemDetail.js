// Usamos fetch() para cargar el archivo reviews.html en el contenedor
fetch('/sources/reviews/reviews.html')
.then(response => response.text())
.then(html => {
    // Inyectamos el contenido de reviews.html en el contenedor
    document.getElementById('review-container').innerHTML = html;
})
.catch(error => {
    console.error('Error al cargar el archivo de reseñas:', error);
});


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
        const color = producto.color || "Color no disponible";
        const size = producto.size || "Talla no disponible";
        const weight = producto.weight || "Peso no disponible"

        const detailContainer = document.getElementById("producto-detail");
        detailContainer.innerHTML = `
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
                      <span class="text-align: center" style="max-width: 250px;">${name}</span>
                    </h1>
                    <h2 class="card-text product-price">$${price} MXN</h2></br>
                   
                    
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary">Agregar a mi bolsa</button>
                    </div>
                  </div>
                      <p class="card-text mt-3 mb-1 product-category"> Categoría: <strong>${category}</strong></p>
                      <p class="card-text mt-3 mb-1 product-size"> Tallas: <strong>${size}</strong></p>
                      <p class="card-text mt-3 mb-1 product-weight"> Peso: <strong> ${weight}</strong></p>  
                </div>  
              </div>
              
              <div class="row">
                <div class="card-footer d-flex mb-3">
                   ${description ? `<h3 class="card-text mb-2"><small style="max-width: 270px;">Descripción del Producto: </br> ${description}</small></h3>` : ''}
                </div>
              </div>
              
            </div>
          `;
      } else {
        document.getElementById("producto-detail").innerHTML = "<p>Producto no encontrado.</p>";
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos del producto:", error);
      document.getElementById("producto-detail").innerHTML = "<p>Hubo un error al cargar el producto.</p>";
    });
});
