import { bakeryProducts } from "./data.js";

const productGrid = document.querySelector("#productGrid");
const productCount = document.querySelector("#productCount");
const filterButtons = document.querySelectorAll("[data-filter]");

function createProductCard(product) {
    return `
        <article class="card">
            <img src="${product.image}" alt="${product.alt}" width="640" height="480" loading="lazy">
            <span class="tag">${product.badge}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="meta">
                <span>${product.category}</span>
                <span>Serves ${product.serves}</span>
                <span>CLP ${product.price.toLocaleString("es-CL")}</span>
            </div>
        </article>
    `;
}

function renderProducts(filter = "all") {
    if (!productGrid) {
        return;
    }

    const filteredProducts = filter === "all"
        ? bakeryProducts
        : bakeryProducts.filter((product) => product.category === filter);

    productGrid.innerHTML = filteredProducts.map(createProductCard).join("");

    if (productCount) {
        productCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} shown`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((chip) => chip.classList.remove("active"));
        button.classList.add("active");
        renderProducts(button.dataset.filter);
    });
});

renderProducts();
