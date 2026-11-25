// Import map berisi hash SRI modul CrootJS yang dipakai script.js (termasuk storage.min.js yang
// diimpor api.min.js): browser menolak modul yang isinya berubah di balik URL yang sama.
// Skrip klasik yang dimuat paling awal, karena Firefox mengabaikan import map yang ditambahkan
// setelah modul atau preload mulai diunduh. Hash diperbarui lib/tools/bump-pins.py.
const map = document.createElement("script");
map.type = "importmap";
map.textContent = JSON.stringify({
    integrity: {
        "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.42/api.min.js": "sha384-FkrcJYDj82Td9axSh3O+A2TIpwCIg67PsrurLGMr5vk4KnL8c+zONZlBbaMEU0Cy",
        "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.42/storage.min.js": "sha384-I68UpwZkgCfB4R68KBk7oSjwdRZqI+8zHf73gCvG+J2YFk5fxD3kBQjgt45dGk0Z",
        "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.42/element.min.js": "sha384-6N+HI8HAMAoIP/QFZna5dQ5InvK/mipiijjWEWJIiJOX/simqIO4fLvZSQMbUp9f",
        "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.42/toast.min.js": "sha384-F6CVYciiH723TqgIYwzLHsrZWnFHw3sVXzcsyeP9XEzVHFL/CHvZDfYeFpdQ6is1"
    }
});
document.currentScript.after(map);
