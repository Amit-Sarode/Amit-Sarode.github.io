
let tl = gsap.timeline()
tl.from("#container", {
    duration: 3,
    y: -100,
    opacity: 0,
    ease: "power3.out",
});

document.getElementById("theme-switch").addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});

tl.from("#projectsCard", {
    y: 100,
    opacity: 0,
    duration: 2,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#projectsCard",
        scroller: "body",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
    },
});
tl.from("#skills", {
    y: 100,
    opacity: 0,
    duration: 2,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#skills",
        scroller: "body",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
    },
});