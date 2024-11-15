const container = document.querySelector("#container")
gsap.from(container, {
    duration: 2,
    y: -60,
    ease: "linear",
})
const theme = document.querySelector("#theme-switch");
theme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});