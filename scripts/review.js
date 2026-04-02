const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const reviewCountElement = document.querySelector("#reviewCount");
const summaryProduct = document.querySelector("#summaryProduct");
const summaryRating = document.querySelector("#summaryRating");
const summaryDate = document.querySelector("#summaryDate");
const summaryFeatures = document.querySelector("#summaryFeatures");
const summaryName = document.querySelector("#summaryName");

const reviewStorageKey = "reviewCount";
const pendingReviewKey = "pendingReview";

function getQueryValue(params, key, fallback) {
    const value = params.get(key);
    return value && value.trim() ? value : fallback;
}

function formatWords(value) {
    return value
        .split("-")
        .join(" ")
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function getProductLabel(productId) {
    const product = products.find((item) => item.id === productId);
    return product ? formatWords(product.name) : productId;
}

function updateReviewCount() {
    let reviewCount = Number(localStorage.getItem(reviewStorageKey)) || 0;
    const hasPendingReview = sessionStorage.getItem(pendingReviewKey) === "true";

    if (hasPendingReview) {
        reviewCount += 1;
        localStorage.setItem(reviewStorageKey, reviewCount);
        sessionStorage.removeItem(pendingReviewKey);
    }

    if (reviewCountElement) {
        reviewCountElement.textContent = reviewCount;
    }
}

function populateSummary() {
    const params = new URLSearchParams(window.location.search);
    const productId = getQueryValue(params, "productName", "Not provided");
    const rating = getQueryValue(params, "rating", "Not provided");
    const installDate = getQueryValue(params, "installDate", "Not provided");
    const features = params.getAll("features");
    const userName = getQueryValue(params, "userName", "Anonymous");

    if (summaryProduct) {
        summaryProduct.textContent = productId === "Not provided" ? productId : getProductLabel(productId);
    }

    if (summaryRating) {
        summaryRating.textContent = rating === "Not provided" ? rating : `${rating} star${rating === "1" ? "" : "s"}`;
    }

    if (summaryDate) {
        summaryDate.textContent = installDate;
    }

    if (summaryFeatures) {
        summaryFeatures.textContent = features.length ? features.map(formatWords).join(", ") : "None selected";
    }

    if (summaryName) {
        summaryName.textContent = userName;
    }
}

updateReviewCount();
populateSummary();
