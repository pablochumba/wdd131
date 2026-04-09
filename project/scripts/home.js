import { bakeryProducts } from "./data.js";

const featuredGrid = document.querySelector("#featuredGrid");
const featuredStatus = document.querySelector("#featuredStatus");
const bestSellerList = bakeryProducts.filter((product) => product.badge === "Best seller" || product.badge === "Rich favorite" || product.badge === "Easy to share").slice(0, 3);

function renderFeaturedProducts() {
    if (!featuredGrid) {
        return;
    }

    featuredGrid.innerHTML = bestSellerList.map((product) => `
        <article class="card">
            <img src="${product.image}" alt="${product.alt}" width="640" height="480" loading="lazy">
            <span class="tag">${product.badge}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="meta">
                <span>Serves ${product.serves}</span>
                <span>CLP ${product.price.toLocaleString("es-CL")}</span>
            </div>
        </article>
    `).join("");

    if (featuredStatus) {
        featuredStatus.textContent = `${bestSellerList.length} best-selling options ready for birthdays and family celebrations.`;
    }
}

renderFeaturedProducts();
