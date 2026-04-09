import { bakeryProducts } from "./data.js";

const cartKey = "sweetToothCart";
const orderCountKey = "sweetToothOrders";

const productSelect = document.querySelector("#orderProduct");
const servingsInput = document.querySelector("#servings");
const addToCartButton = document.querySelector("#addToCart");
const estimateButton = document.querySelector("#estimateButton");
const estimateOutput = document.querySelector("#estimateOutput");
const cartList = document.querySelector("#cartList");
const cartTotal = document.querySelector("#cartTotal");
const cartSummary = document.querySelector("#cartSummary");
const orderForm = document.querySelector("#orderForm");

function formatCurrency(value) {
    return `CLP ${value.toLocaleString("es-CL")}`;
}

function loadCart() {
    return JSON.parse(localStorage.getItem(cartKey) ?? "[]");
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function populateProductOptions() {
    if (!productSelect) {
        return;
    }

    bakeryProducts.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} - ${formatCurrency(product.price)}`;
        productSelect.append(option);
    });
}

function estimatePrice() {
    if (!productSelect || !servingsInput || !estimateOutput) {
        return;
    }

    const product = bakeryProducts.find((item) => item.id === productSelect.value);
    const servings = Number(servingsInput.value);

    if (!product || !servings) {
        estimateOutput.innerHTML = `<strong>Choose a product and number of servings</strong><span class="notice">We will estimate the best option for your celebration.</span>`;
        return;
    }

    const packagesNeeded = Math.ceil(servings / product.serves);
    const estimatedPrice = packagesNeeded * product.price;

    estimateOutput.innerHTML = `<strong>${formatCurrency(estimatedPrice)}</strong><span class="notice">Estimated using ${packagesNeeded} order${packagesNeeded === 1 ? "" : "s"} of ${product.name}.</span>`;
}

function updateCartSummary(cart) {
    if (!cartTotal || !cartSummary) {
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.total, 0);
    cartTotal.textContent = formatCurrency(total);
    cartSummary.value = cart.length ? cart.map((item) => `${item.name} x${item.quantity}`).join(", ") : "No items yet";
}

function renderCart() {
    if (!cartList) {
        return;
    }

    const cart = loadCart();

    if (!cart.length) {
        cartList.innerHTML = `<li class="cart-empty">Your cart is empty. Add a product to start your order.</li>`;
        updateCartSummary(cart);
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <li class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <div class="notice">${item.quantity} package${item.quantity === 1 ? "" : "s"} for about ${item.serves * item.quantity} servings</div>
            </div>
            <div>
                <div>${formatCurrency(item.total)}</div>
                <button class="filter-chip" type="button" data-remove="${index}">Remove</button>
            </div>
        </li>
    `).join("");

    updateCartSummary(cart);
}

function addToCart() {
    const product = bakeryProducts.find((item) => item.id === productSelect?.value);
    const servings = Number(servingsInput?.value);

    if (!product || !servings) {
        estimatePrice();
        return;
    }

    const quantity = Math.ceil(servings / product.serves);
    const cart = loadCart();
    cart.push({
        id: product.id,
        name: product.name,
        quantity,
        serves: product.serves,
        total: quantity * product.price
    });
    saveCart(cart);
    renderCart();
    estimateOutput.innerHTML = `<strong>Added to cart</strong><span class="notice">${product.name} was added for approximately ${servings} servings.</span>`;
}

function setupCartRemoval() {
    if (!cartList) {
        return;
    }

    cartList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const removeIndex = target.dataset.remove;
        if (removeIndex === undefined) {
            return;
        }

        const cart = loadCart();
        cart.splice(Number(removeIndex), 1);
        saveCart(cart);
        renderCart();
    });
}

function prepareOrderSubmission() {
    if (!orderForm) {
        return;
    }

    orderForm.addEventListener("submit", () => {
        const currentCount = Number(localStorage.getItem(orderCountKey)) || 0;
        localStorage.setItem(orderCountKey, currentCount + 1);
    });
}

if (estimateButton) {
    estimateButton.addEventListener("click", estimatePrice);
}

if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
}

populateProductOptions();
renderCart();
setupCartRemoval();
prepareOrderSubmission();
