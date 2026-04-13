import { celebrationIdeas } from "./data.js";

const eventGrid = document.querySelector("#eventGrid");
const audienceSelect = document.querySelector("#audienceSelect");
const eventMessage = document.querySelector("#eventMessage");

function renderIdeas(audience = "all") {
    if (!eventGrid) {
        return;
    }

    const filteredIdeas = audience === "all"
        ? celebrationIdeas
        : celebrationIdeas.filter((idea) => idea.audience.toLowerCase().includes(audience));

    eventGrid.innerHTML = filteredIdeas.map((idea) => `
        <article class="card">
            <img src="${idea.image}" alt="${idea.title}" width="640" height="480" loading="lazy">
            <span class="tag">${idea.audience}</span>
            <h3>${idea.title}</h3>
            <p>${idea.note}</p>
        </article>
    `).join("");

    if (eventMessage) {
        const label = audience === "all" ? "all celebration ideas" : `${audience} celebration ideas`;
        eventMessage.textContent = `Showing ${filteredIdeas.length} options for ${label}.`;
    }
}

if (audienceSelect) {
    audienceSelect.addEventListener("change", () => {
        renderIdeas(audienceSelect.value);
    });
}

renderIdeas();
