document.addEventListener("DOMContentLoaded", function(){
    const footer = `
    <footer class="container-fluid footer-container bg-dark-purple p-5 sticky-bottom">
        <div class="container text-body text-center">
            <div class="row text-style-light">
                <div class="footer-brand col-md-4">
                    <a class="logo white-logo" href="#">empo<span>w</span>erfit</a>
                    <p>©Todos los derechos reservados.</p>
                  </div>
                  <div class="footer-links col-md-4">
                <p class="mb-md-0"><a class="link-item" href="#" target="_blank">Términos y condiciones</a></p> 
                <p class="mb-md-0"><a class="link-item" href="#" target="_blank">Aviso de Privacidad</a></p>  
              </div>
              <div class="footer-redes col-md-4">
                <a class="btn" type="button" href="#" target="_blank">
                    <i class="footer-item-icon bi bi-facebook"></i>
                </a>
                <a class="btn" type="button" href="#" target="_blank">
                    <i class="footer-item-icon bi bi-instagram"></i>
                </a>
                <a class="btn" type="button" href="#" target="_blank">
                    <i class="footer-item-icon bi bi-twitter-x"></i>
                </a>
              </div>
            </div>
          </div>
    </footer>`;
document.getElementById("footer-container").innerHTML = footer;
})