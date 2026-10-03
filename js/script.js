document.addEventListener("DOMContentLoaded", () => {

    /*
     * ==================================================
     * 01. CURRENT YEAR
     * ==================================================
     */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /*
     * ==================================================
     * 02. CURSOR AMBIENT GLOW
     * ==================================================
     */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        cursorGlow &&
        finePointer &&
        !reducedMotion
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let currentX =
            mouseX;

        let currentY =
            mouseY;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        const animateCursorGlow = () => {

            currentX +=
                (mouseX - currentX) * 0.085;

            currentY +=
                (mouseY - currentY) * 0.085;


            cursorGlow.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                ) translate(-50%, -50%)`;


            requestAnimationFrame(
                animateCursorGlow
            );
        };


        animateCursorGlow();
    }


    /*
     * ==================================================
     * 03. SCROLL REVEAL
     *
     * FIX:
     * Added .hero-content and .section-heading.
     *
     * These elements already have the "reveal" class
     * in index.html, but the old JavaScript was not
     * observing them.
     * ==================================================
     */

    const revealElements =
        document.querySelectorAll(
            [
                ".hero-content",
                ".section-heading",
                ".about-card",
                ".service-card",
                ".project-card",
                ".cloud-card",
                ".benefit-card",
                ".suggestion-card",
                ".contact-action",
                ".resume-card",
                ".owner-profile-card",
                ".pipeline-step",
                ".pipeline-result",
                ".stat-card"
            ].join(", ")
        );


    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(
                (
                    entries,
                    observerInstance
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.setProperty(
                    "--reveal-delay",
                    `${Math.min(
                        index * 45,
                        260
                    )}ms`
                );


                observer.observe(
                    element
                );

            }
        );
    }


    /*
     * ==================================================
     * 04. SMOOTH INTERNAL NAVIGATION
     * ==================================================
     */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    let target = null;

                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;
                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",

                        block: "start"
                    });


                    /*
                     * Update the browser URL
                     * without causing another jump.
                     */

                    if (
                        window.history &&
                        window.history.pushState
                    ) {

                        window.history.pushState(
                            null,
                            "",
                            targetId
                        );

                    }

                }
            );

        }
    );


    /*
     * ==================================================
     * 05. PIPELINE HOVER INTERACTION
     * ==================================================
     */

    const pipelineSteps =
        document.querySelectorAll(
            ".pipeline-step"
        );


    pipelineSteps.forEach(
        (step) => {

            step.addEventListener(
                "mouseenter",
                () => {

                    if (
                        !reducedMotion
                    ) {

                        step.style.transform =
                            "translateY(-4px)";

                    }

                }
            );


            step.addEventListener(
                "mouseleave",
                () => {

                    step.style.transform =
                        "";

                }
            );

        }
    );


    /*
     * ==================================================
     * 06. SUGGESTION FORM
     *
     * Front-end only.
     * No data is sent or stored.
     * ==================================================
     */

    const suggestionForm =
        document.querySelector(
            "#suggestionForm"
        );


    const formStatus =
        document.querySelector(
            "#formStatus"
        );


    if (
        suggestionForm &&
        formStatus
    ) {

        suggestionForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (
                    !suggestionForm.checkValidity()
                ) {

                    suggestionForm.reportValidity();

                    return;
                }


                formStatus.textContent =
                    "Thanks — your suggestion is ready to be connected to a submission service.";


                formStatus.style.color =
                    "#7ee2a8";

            }
        );

    }


    /*
     * ==================================================
     * 07. CONTACT ACTION INTERACTION
     * ==================================================
     */

    const contactActions =
        document.querySelectorAll(
            ".contact-action"
        );


    contactActions.forEach(
        (action) => {

            action.addEventListener(
                "mouseenter",
                () => {

                    action.style.setProperty(
                        "--contact-hover",
                        "1"
                    );

                }
            );


            action.addEventListener(
                "mouseleave",
                () => {

                    action.style.setProperty(
                        "--contact-hover",
                        "0"
                    );

                }
            );

        }
    );


    /*
     * ==================================================
     * 08. LOGO INTERACTION
     * ==================================================
     */

    const brand =
        document.querySelector(
            ".brand"
        );


    if (brand) {

        brand.addEventListener(
            "mouseenter",
            () => {

                brand.classList.add(
                    "brand-active"
                );

            }
        );


        brand.addEventListener(
            "mouseleave",
            () => {

                brand.classList.remove(
                    "brand-active"
                );

            }
        );

    }


    /*
     * ==================================================
     * 09. OWNER CARD MICRO-INTERACTION
     * ==================================================
     */

    const ownerCard =
        document.querySelector(
            ".owner-profile-card"
        );


    if (
        ownerCard &&
        finePointer &&
        !reducedMotion
    ) {

        ownerCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    ownerCard.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -2;


                const rotateY =
                    ((x / rect.width) - 0.5) * 2;


                ownerCard.style.transform =
                    `translateY(-4px)
                     perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        ownerCard.addEventListener(
            "mouseleave",
            () => {

                ownerCard.style.transform =
                    "";

            }
        );

    }

});

/* ==================================================
   WELCOME MESSAGE — AUTO DISMISS
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (!welcomeMessage) {
        return;
    }

    setTimeout(() => {
        welcomeMessage.classList.add("is-hidden");

        setTimeout(() => {
            welcomeMessage.remove();
        }, 500);

    }, 5000);
});
