
gsap.from("#container", {
    duration: 3,
    y: -100,
    opacity: 0,
    ease: "power3.out",
});

document.getElementById("theme-switch").addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});

gsap.from("#projectsCard", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: "#projectsCard",
        scroller: "body",
        // markers: true,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
    },
});
gsap.from("#skills", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: "#skills",
        scroller: "body",
        // markers: true,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
    },
});
