export function initNestedScroll() {
    gsap.registerPlugin(ScrollTrigger);
    
    const scrollingPane = document.querySelector(".scrolling-pane");
    if (scrollingPane) {
        gsap.to(scrollingPane, {
            xPercent: -100 * (2 / 3), // geser sejauh 2 dari 3 kolom
            ease: "none",
            scrollTrigger: {
                trigger: "#detailed-about",
                scroller: ".main-container",
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
            }
        });
    }
}