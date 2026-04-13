const orderCount = document.querySelector("#orderCount");
const orderSummary = document.querySelector("#orderSummary");
const pickupDate = document.querySelector("#pickupDate");
const customerName = document.querySelector("#customerName");

function populateConfirmation() {
    const params = new URLSearchParams(window.location.search);
    const totalOrders = Number(localStorage.getItem("sweetToothOrders")) || 0;

    if (orderCount) {
        orderCount.textContent = `${totalOrders}`;
    }

    if (orderSummary) {
        orderSummary.textContent = params.get("cartSummary") || "Custom bakery order";
    }

    if (pickupDate) {
        pickupDate.textContent = params.get("pickupDate") || "To be confirmed";
    }

    if (customerName) {
        customerName.textContent = params.get("customerName") || "Sweet Tooth customer";
    }
}

populateConfirmation();
