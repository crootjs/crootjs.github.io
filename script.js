import { getJSON } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.36/api.min.js";
import { onClick, onClicks, setInnerText } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.36/element.min.js";
import { toastError } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.36/toast.min.js";

// Menu navigasi di layar sempit
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

onClick("nav-toggle", () => setMenu(!links.classList.contains("open")));
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
onClicks("copy-btn", (button) => {
    const text = button.parentElement.nextElementSibling.textContent;
    navigator.clipboard.writeText(text).then(
        () => {
            button.textContent = "Copied!";
            button.classList.add("copied");
            setTimeout(() => {
                button.textContent = "Copy";
                button.classList.remove("copied");
            }, 2000);
        },
        // Ditolak kalau browser tidak memberi izin clipboard
        () => toastError("Could not copy. Select the code and copy it manually."),
    );
});

// Versi terbaru dibaca dari file yang ditulis workflow rilis lib setelah jsDelivr siap.
// Kalau gagal, tautan "Releases" di HTML tetap tampil.
getJSON("/lib/version.json", ({ status, data }) => {
    if (status === 200 && data?.version) setInnerText("hero-version", "v" + data.version);
});
