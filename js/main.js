const toggleButton = document.querySelector(".toggle-button");
const navLinks = document.querySelector(".nav-links");

toggleButton.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
});