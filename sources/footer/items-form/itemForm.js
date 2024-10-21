document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("itemForm");
    const imagenInput = document.getElementById("imagen");
    const previewImage = document.getElementById("preview");
    const clearStorageButton = document.getElementById("clearStorage");
    const modifyItemButton = document.getElementById("modifyItemBtn");
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("row", "mt-4");
    itemForm.parentElement.appendChild(productsContainer);
    let currentEditIndex = null;
    let currentImageData = null;
  
    if (imagenInput) {
      // Mostrar vista previa de la imagen al seleccionarla
      imagenInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = "block";
            currentImageData = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          previewImage.src = "";
          previewImage.style.display = "none";
        }
      });
    }
  
    if (clearStorageButton) {
        clearStorageButton.addEventListener("click", () => {
          // Mostrar el modal para la contraseña
          const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
          passwordModal.show();
      
          // Agregar evento de confirmación
          document.getElementById('confirmPasswordButton').onclick = () => {
            const password = document.getElementById('passwordInput').value;
            
            if (password === '123456') {
              localStorage.removeItem("productos");
              showAlert("El almacenamiento ha sido limpiado correctamente.", "info");
              passwordModal.hide(); // Cerrar el modal
            } else {
              showAlert("Contraseña incorrecta. No se realizó ninguna acción.", "danger");
            }
          };
        });
      }
       
  
    if (modifyItemButton) {
      // Mostrar productos almacenados al presionar el botón "Modificar Item"
      modifyItemButton.addEventListener("click", () => {
        productsContainer.innerHTML = "";
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
        if (productos.length > 0) {
          productos.forEach((producto, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-6", "col-lg-4", "mb-4");
            productCard.innerHTML = `
              <div class="card">
                <img src="${producto.imagen || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${producto.nombre}" style="height: 349px; width: 100%; object-fit: cover;">
                <div class="card-body product-info text-center pb-2">
                  <p class="card-text product-category">${producto.categoria}</p>
                  <h4 class="card-title product-name mt-3 mb-1"><span class="d-inline-block text-truncate" style="max-width: 250px;">${producto.nombre}</span></h4>
                  ${producto.descripcion ? `<p class="card-text mb-2"><small class="d-inline-block text-truncate" style="max-width: 270px;">${producto.descripcion}</small></p>` : ''}
                  <p class="card-text product-price">$${producto.precio} MXN</p>
                </div>
                <div class="card-footer d-flex justify-content-center gap-2 mb-3">
                    <button type="button" class="btn btn-primary" onclick="editProduct(${index})">Editar</button>
                    <button type="button" class="btn btn-primary" onclick="deleteProduct(${index})">Eliminar</button>
                </div>
              </div>
            `;


            productsContainer.appendChild(productCard);
          });
        } else {
          productsContainer.innerHTML = '<p class="text-center">No hay productos disponibles para modificar.</p>';
        }
      });
    }
  
    if (itemForm) {
      itemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
  
        let form = event.target;
        if (form.checkValidity()) {
          const imageFile = imagenInput.files[0];
  
          const saveItem = (imageData) => {
            const item = {
              categoria: document.getElementById("categoria").value,
              nombre: document.getElementById("nombre").value,
              descripcion: document.getElementById("descripcion").value,
              precio: document.getElementById("precio").value,
              talla: document.getElementById("talla").value ? document.getElementById("talla").value.split(",") : [],
              peso: document.getElementById("peso").value ? document.getElementById("peso").value.split(",") : [],
              color: document.getElementById("color").value,
              stock: document.getElementById("stock").value,
              imagen: imageData || currentImageData || "https://via.placeholder.com/150"
            };
  
            try {
              let storedItems = JSON.parse(localStorage.getItem("productos")) || [];
              if (currentEditIndex !== null) {
                storedItems[currentEditIndex] = item;
                currentEditIndex = null;
                currentImageData = null;
              } else {
                storedItems.push(item);
              }
              localStorage.setItem("productos", JSON.stringify(storedItems));
  
              // Mostrar mensaje de éxito
              showAlert("El item ha sido creado/modificado exitosamente.", "success");
  
              // Redirigir a la página de productos después de un pequeño retraso
              setTimeout(() => window.location.href = "/sources/items/items.html", 1500);
            } catch (e) {
              console.error("Error al guardar en localStorage: ", e);
              showAlert("No se pudo crear/modificar el producto debido a un problema de almacenamiento.", "danger");
            }
          };
  
          if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
              saveItem(reader.result);
            };
            reader.readAsDataURL(imageFile);
          } else {
            saveItem();
          }
        } else {
          form.classList.add("was-validated");
          showAlert("Por favor, complete todos los campos obligatorios.", "danger");
        }
      });
    }
  
    function showAlert(message, type) {
      const alertContainer = document.getElementById("alertContainer");
      alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                      ${message}
                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                   </div>`;
    }
  
    // Función para editar un producto existente
    window.editProduct = function (index) {
      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      const producto = productos[index];
      if (producto) {
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("descripcion").value = producto.descripcion;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("talla").value = producto.talla.join(",");
        document.getElementById("peso").value = producto.peso.join(",");
        document.getElementById("color").value = producto.color;
        document.getElementById("stock").value = producto.stock;
        previewImage.src = producto.imagen;
        previewImage.style.display = "block";
        currentEditIndex = index;
        currentImageData = producto.imagen;
      }
    };
  
 // Función para eliminar un producto existente
window.deleteProduct = function (index) {
    // Mostrar el modal para la contraseña
    const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
    passwordModal.show();
  
    // Agregar evento de confirmación
    document.getElementById('confirmPasswordButton').onclick = () => {
      const password = document.getElementById('passwordInput').value;
      
      if (password === '123456') {
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        showAlert("El producto ha sido eliminado exitosamente.", "success");
        modifyItemButton.click(); // Actualizar la lista de productos
        passwordModal.hide(); // Cerrar el modal
      } else {
        showAlert("Contraseña incorrecta. No se realizó ninguna acción.", "danger");
      }
    };
  };  
  });
  