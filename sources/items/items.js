document.addEventListener('DOMContentLoaded', function () {
  const rutaJSON = '/sources/items/items.json';
  // Obtener el contenedor de productos
  const productsContainer = document.getElementById('products-container');

   // Obtener los productos del archivo JSON y combinar con los productos de localStorage
  let productosLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];

  const url = new URL(window.location.href);
  const nombreCategoria = url.searchParams.get("categoria");
  console.log(nombreCategoria);
 
  function cargarProductos(rutaJSON, contenedor, productosLocalStorage = [], filtroCategoria = "todos", filtroBusqueda = "") {
  fetch(rutaJSON)
    .then(response => response.json())
    .then(productosJSON => {
      // Mapear las propiedades del JSON a las propiedades esperadas
      const productosMapeados = productosJSON.map(producto => {
        return {
          categoria: producto.category,
          nombre: producto.name,
          descripcion: producto.description,
          precio: producto.price,
          talla: producto.size || [],
          peso: producto.weight || [],
          color: producto.color || '',
          stock: producto.stock,
          imagen: producto.image,
          id: producto.id  //Agrega id del producto desde el JSON para crear la URL por cada producto

        };
      });

      // Unir los productos del JSON con los del localStorage
      let productos = productosMapeados.concat(productosLocalStorage);

      // Filtrar los productos por la categoría seleccionada
      if (filtroCategoria !== "todos") {
        productos = productos.filter(producto => producto.categoria.toLowerCase() == filtroCategoria.toLowerCase());
      }

      if (filtroBusqueda) {
        productos = productos.filter(producto => producto.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()));
      }

      // Limpiar el contenedor antes de añadir los productos filtrados
      contenedor.innerHTML = "";

      // Verificar si hay productos almacenados
      if (productos.length > 0) {
        // Recorrer cada producto y crear una tarjeta para mostrarlo


        productos.forEach((producto) => {
          const productCard = document.createElement('div');
          productCard.classList.add('col-md-6', 'col-lg-4', 'mb-4');

          // Crea una referencia dinamica para que cada tarjeta lleve a una pagina html diferente
          //Agrega <a> anchor para abrir la pagina individual de producto al dar click en la tarjeta del mismo
          const itemDetailUrl = `/sources/items/itemDetail/itemDetail.html?id=${producto.id}`;
          const shopingBag = '../payPage/payPage.html';
          
     //modificar shopingbag para que el boton agregar a mi bolsa envie a la pagina de compras

          productCard.innerHTML = `
              <div class="card">
                <a class="image-link" href="${itemDetailUrl}">              
                <img src="${producto.imagen || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${producto.nombre}" style="height: 349px; width: 100%; object-fit: cover;">
                </a>
                <div class="card-body product-info text-center pb-2">
                  <p class="card-text product-category">${producto.categoria}</p>
                  <h4 class="card-title product-name mt-3 mb-1"><span class="d-inline-block text-truncate" style="max-width: 250px;">${producto.nombre}</span></h4>
                  ${producto.descripcion ? `<p class="card-text mb-2"><small class="d-inline-block text-truncate" style="max-width: 270px;">${producto.descripcion}</small></p>` : ''}
                  <p class="card-text product-price">$${producto.precio} MXN</p>
                </div>
                <div class="card-footer d-flex justify-content-evenly mb-3">
                  <div class="btn-group" role="group">
                    <a href="${shopingBag}" class="btn btn-primary">Agregar a mi bolsa</a>
                    <a href="${itemDetailUrl}" class="btn btn-outline-primary"><i class="bi bi-search"></i></a>
                  </div>
                </div>
              </div>
            `;
          productsContainer.appendChild(productCard);
        });
      } else {
        // Mostrar un mensaje si no hay productos
        productsContainer.innerHTML = '<p class="text-center">No hay productos disponibles.</p>';
      }
    })
    .catch(error => {
      console.error('Error cargando los productos:', error);
      // Mostrar un mensaje si ocurre un error al cargar los productos
      productsContainer.innerHTML = '<p class="text-center">Error cargando los productos.</p>';
    });
  
  }

  function filterStyleProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      if (value.toLowerCase() == button.innerText.toLowerCase()) {
        button.classList.add("active-filter");
      } else {
        button.classList.remove("active-filter");
      }
    });
  }
 filterStyleProduct("todos");

  // Búsqueda por nombre
  document.getElementById("search").addEventListener("click", () => {
    const searchInput = document.getElementById('search-input').value.trim();
    cargarProductos(rutaJSON, productsContainer, productosLocalStorage, "todos", searchInput);
    
     // Limpieza del campo de búsqueda
     document.getElementById('search-input').value = '';
  });

  // Inicializar con todos los productos
  cargarProductos(rutaJSON, productsContainer, productosLocalStorage, "todos");

  // Filtro por categoría
  document.querySelectorAll('.button-value').forEach(button => {
    button.addEventListener('click', () => {
      filterStyleProduct(button.innerText);
      const categoria = button.innerText;
      cargarProductos(rutaJSON, productsContainer, productosLocalStorage, categoria);
    });
  });
  
  // Manejar la creación de un nuevo producto
  const itemForm = document.getElementById('itemForm');
  const imagenInput = document.getElementById('imagen');
  const previewImage = document.getElementById('preview');

  if (imagenInput) {
    // Mostrar vista previa de la imagen al seleccionarla
    imagenInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
          previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
      }
    });
  }

  if (itemForm) {
    itemForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Obtener los valores del formulario
      const categoria = document.getElementById('categoria').value;
      const nombre = document.getElementById('nombre').value;
      const descripcion = document.getElementById('descripcion').value;
      const precio = document.getElementById('precio').value;
      const talla = document.getElementById('talla').value;
      const peso = document.getElementById('peso').value;
      const color = document.getElementById('color').value;
      const stock = document.getElementById('stock').value;
      const imagen = imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : 'https://via.placeholder.com/150';

      // Crear un objeto de producto
      if (categoria && nombre && descripcion && precio && stock) {
        const nuevoProducto = {
          categoria,
          nombre,
          descripcion,
          precio,
          talla,
          peso,
          color,
          stock,
          imagen,
        };

        // Obtener los productos existentes del localStorage
        let productos = JSON.parse(localStorage.getItem('productos')) || [];

        // Agregar el nuevo producto a la lista de productos
        productos.push(nuevoProducto);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('productos', JSON.stringify(productos));

        // Mostrar mensaje de éxito
        showAlert('El item ha sido creado exitosamente.', 'success');

        // Redirigir a la página de productos después de un pequeño retraso
        setTimeout(() => window.location.href = '/sources/items/items.html', 1500);
      } else {
        // Mostrar mensaje de error si faltan campos obligatorios
        showAlert('No se pudo crear el producto. Por favor complete todos los campos obligatorios.', 'danger');
      }
    });
  }

  function showAlert(message, type) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.role = 'alert';
    alertContainer.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    document.body.prepend(alertContainer);
  }
});