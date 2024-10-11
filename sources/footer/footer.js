document.addEventListener("DOMContentLoaded", function(){
    const footer = `
       <footer class="text-light py-4">
      <div class="container">
        <div class="row text-center text-md-left">
          <div class="col-md-4 mb-3">
            <a class="navbar-brand font-30px" href="#">empo<span>w</span>erfit</a>
            <p><small>&copy; 2024. Todos los derechos reservados.</small></p>
          </div>
          <div class="col-md-2 mb-3">
            <h6><small><a href="#" class="text-light">Avisos de privacidad</a></small></h6>
          </div>
          <div class="col-md-2 mb-3">
            <h6><small><a href="#" class="text-light">Términos y condiciones</a></small></h6>
          </div>
          <div class="col-md-4 mb-3">
            <h6><small>Síguenos en redes sociales</small></h6>
            <div class="social-icons">
              <a href="#" class="text-light me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-light me-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-light"><i class="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>`;
document.getElementById("footer-container").innerHTML = footer;
})