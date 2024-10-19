document.addEventListener("DOMContentLoaded", function(){
    const navbar = `
        <nav class="navbar fixed-top navbar-expand-lg ">
            <div class="container">
                <!-- mobile menu -->
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- logo -->
                <a class="logo me-auto" href="#">empo<span>w</span>erfit</a>
                <!-- pages-->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <p class="logo" id="offcanvasNavbarLabel">empo<span>w</span>erfit</p>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 nav-underline" id="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link text-style-dark mx-lg-2" href="/index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-style-dark mx-lg-2" href="/sources/items/items.html">Productos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-style-dark mx-lg-2" href="/sources/aboutUs/about-us.html">Acerca de</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-style-dark mx-lg-2" href="/sources/community/community.html">Comunidad</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-style-dark mx-lg-2" aria-current="page" href="/sources/contactForm/contactForm.html">Contacto</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- user button-->
                <div class="dropdown">
                    <button class="btn btn-icon" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="nav-item-icon bi bi-person-circle"></i>
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                        <li><a class="dropdown-item text-style-dark" href="/sources/signIn/signIn.html">Ingresar</a></li>
                        <li><a class="dropdown-item text-style-dark" href="/sources/createAccount/createAccount.html">Crear cuenta</a></li>
                        <li><a class="dropdown-item text-style-dark" href="/sources/createAccount/createAccount.html">Administración</a></li>
                    </ul>
                </div>
                <!-- shop bag button-->
                <button type="button" class="btn btn-icon position-relative" onclick="window.location.href='/sources/payPage/payPage.html';">
                    <i class="nav-item-icon bi bi-bag" ></i>
                    <span class="position-absolute top-50 start-60 translate-middle-x badge rounded-pill bg-dark-purple">
                        0
                        <span class="visually-hidden"></span>
                    </span>
                </button>
            </div>
        </nav>`;
    document.getElementById("navbar-container").innerHTML = navbar;

    // Agregar clase 'active' al enlace correspondiente
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
            link.style.fontWeight = "bold"; // Aplicar estilo de negritas
        }
    });
});
