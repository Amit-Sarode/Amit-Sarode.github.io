
gsap.from("#container", {
    duration: 3,
    y: -100,
    opacity: 0,
    ease: "power3.out",
});

document.getElementById("theme-switch").addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});

// const projectCards = document.querySelectorAll(".projectsCard");
// projectCards.forEach((card) => {
//     const info = card.querySelector(".info");
//     card.addEventListener("mouseenter", () => {
//         gsap.to(info, { opacity: 1, transform: "translateY(0)", duration: 0.5 });
//     });
//     card.addEventListener("mouseleave", () => {
//         gsap.to(info, { opacity: 0, transform: "translateY(20px)", duration: 0.5 });
//     });
// });
