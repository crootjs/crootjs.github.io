// Menu navigasi di layar sempit
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Fokus ikut pindah, supaya Tab berikutnya mulai dari bagian itu
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
    });
});

// Copy code button
document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const text = button.parentElement.nextElementSibling.textContent;
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = "Copied!";
            button.classList.add("copied");
            setTimeout(() => {
                button.textContent = "Copy";
                button.classList.remove("copied");
            }, 2000);
        });
    });
});
