document.addEventListener("DOMContentLoaded", () => {
    gsap.from("#navbar", {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power3.out"
    });
});
document.getElementById("theme-switch").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
});
