console.log("Proyecto iniciado");

// =========================
// Inicializar EmailJS
// =========================

emailjs.init({
    publicKey: "M7ZBZhp-7BsM7Pgj2",
});

// =========================
// Animación al hacer scroll
// =========================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach((element) => {
    observer.observe(element);
});

// =========================
// Navbar al hacer scroll
// =========================

const navbar = document.querySelector(".navbar");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");



window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if(navLinks.classList.contains("active")){
        icon.classList.replace("fa-bars", "fa-xmark");     
    } else {
        icon.classList.replace("fa-xmark", "fa-bars")
    }
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");

    });
});

const sections = document.querySelectorAll("header, section");


// =========================
// Formulario de contacto
// =========================

const form = document.querySelector("#contact-form");
const submitButton = form.querySelector("button");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    //Validacion de campos vacíos
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const website = form.website.value.trim(); // Obtener el valor del campo honeypot

    // Verificar si el campo honeypot está lleno
    if (website){
        return; // Si el campo honeypot tiene valor, no enviar el formulario    
    }

    if (!name || !email || ! message) {
        formMessage.textContent = "❌ Por favor completá todos los campos.";
        formMessage.className = "error-message show";
        return;
    }

    // Limpiar mensaje anterior
    formMessage.textContent = "";
    formMessage.className = "";

    // Cambiar estado del botón
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";


    //PRUEBA de comunicación con la API

    const response = fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    });

    const data = await response.json();
    console.log(data);

    



    emailjs.sendForm(
        "service_ds63lij",
        "template_zpeqz18",
        form
    )

    .then(() => {

        formMessage.textContent = "✅ ¡Mensaje enviado correctamente!";
        formMessage.className = "success-message show";

        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensaje";

        form.reset();

        setTimeout(() => {

            formMessage.textContent = "";

        }, 3000);

    })

    .catch((error) => {

        console.error(error);

        formMessage.textContent = "❌ No se pudo enviar el mensaje. Intentá nuevamente.";
        formMessage.className = "error-message show";

        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensaje";

    });
    
});

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {

        item.classList.remove("active");

        if (item.getAttribute("href") === "#" + current) {
            
            item.classList.add("active");
        }
    });
});


