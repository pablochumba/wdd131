const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const pageBody = document.body;

function updateFooterDates() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function setupNavigation() {
    if (!navToggle || !navLinks) {
        return;
    }

    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setActiveLink() {
    const page = pageBody?.dataset.page;
    if (!page) {
        return;
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.dataset.page === page) {
            link.classList.add("active");
        }
    });
}

updateFooterDates();
setupNavigation();
setActiveLink();
