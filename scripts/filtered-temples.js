const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba-nigeria-temple.webp"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Peru",
        location: "Lima, Peru",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/lima-peru-temple.webp"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/mexico-city-mexico-temple.webp"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "images/rome-italy-temple.webp"
    },
    {
        templeName: "Santiago Chile",
        location: "Santiago, Chile",
        dedicated: "1983, September, 15",
        area: 20053,
        imageUrl: "images/santiago-chile-temple.webp"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "images/accra-ghana-temple.webp"
    }
];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#primaryNav");
const navigationLinks = document.querySelectorAll(".navigation a");
const templeCards = document.querySelector("#templeCards");
const pageTitle = document.querySelector("#pageTitle");

function getTempleYear(temple) {
    return Number(temple.dedicated.split(",")[0].trim());
}

function displayTemples(templeList) {
    templeCards.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");
        const name = document.createElement("h2");
        const location = document.createElement("p");
        const dedication = document.createElement("p");
        const area = document.createElement("p");

        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.width = 400;
        image.height = 250;
        image.loading = "lazy";

        name.textContent = temple.templeName;
        location.innerHTML = `<span>Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span>Area:</span> ${temple.area.toLocaleString()} sq ft`;

        caption.append(name, location, dedication, area);
        card.append(image, caption);
        templeCards.append(card);
    });
}

function getFilteredTemples(filter) {
    switch (filter) {
        case "old":
            return temples.filter((temple) => getTempleYear(temple) < 1900);
        case "new":
            return temples.filter((temple) => getTempleYear(temple) > 2000);
        case "large":
            return temples.filter((temple) => temple.area > 90000);
        case "small":
            return temples.filter((temple) => temple.area < 10000);
        default:
            return temples;
    }
}

function getHeading(filter) {
    switch (filter) {
        case "old":
            return "Old Temples";
        case "new":
            return "New Temples";
        case "large":
            return "Large Temples";
        case "small":
            return "Small Temples";
        default:
            return "Sacred Temples Gallery";
    }
}

function setActiveLink(selectedFilter) {
    navigationLinks.forEach((link) => {
        const isActive = link.dataset.filter === selectedFilter;
        link.classList.toggle("active", isActive);
        link.setAttribute("aria-current", isActive ? "page" : "false");
    });
}

function applyFilter(filter) {
    pageTitle.textContent = getHeading(filter);
    setActiveLink(filter);
    displayTemples(getFilteredTemples(filter));

    if (navigation && menuButton && navigation.classList.contains("open")) {
        navigation.classList.remove("open");
        menuButton.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        applyFilter(link.dataset.filter);
    });
});

applyFilter("home");
