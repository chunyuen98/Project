import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-ChjVrVGSPC5O9c6N_SviSJOj9QIQLoc",
    authDomain: "project-b06e7.firebaseapp.com",
    projectId: "project-b06e7",
    storageBucket: "project-b06e7.firebasestorage.app",
    messagingSenderId: "632273807013",
    appId: "1:632273807013:web:4825492cd4624c64f28f4c",
    measurementId: "G-ZEJNTFRS7X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "../Login/login.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../Login/login.html";
    }).catch(console.error);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));

// Search
document.getElementById("searchBtn").addEventListener("click", applyFilters);
document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
});

// ── Cart ──────────────────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("shopeasy_cart") || "[]");

function saveCart() {
    localStorage.setItem("shopeasy_cart", JSON.stringify(cart));
    renderCartCount();
}

function renderCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cartCount").textContent = total;
}

function addToCart(id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    showToast();
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

window.addToCart = addToCart;
renderCartCount();

// ── All Products ──────────────────────────────────────────────────────────────
const allProducts = [
    { id: 1,  name: "Wireless Headphones",  category: "Electronics", price: 89.99,  oldPrice: 129.99, rating: 4.5, reviews: 234, icon: "🎧" },
    { id: 2,  name: "Smart Watch",          category: "Electronics", price: 199.99, oldPrice: 249.99, rating: 4.8, reviews: 567, icon: "⌚" },
    { id: 3,  name: "Running Shoes",        category: "Sports",      price: 64.99,  oldPrice: null,   rating: 4.3, reviews: 189, icon: "👟" },
    { id: 4,  name: "Casual T-Shirt",       category: "Fashion",     price: 24.99,  oldPrice: 39.99,  rating: 4.1, reviews: 421, icon: "👕" },
    { id: 5,  name: "Coffee Maker",         category: "Home",        price: 49.99,  oldPrice: 69.99,  rating: 4.6, reviews: 312, icon: "☕" },
    { id: 6,  name: "Yoga Mat",             category: "Sports",      price: 34.99,  oldPrice: null,   rating: 4.4, reviews: 98,  icon: "🧘" },
    { id: 7,  name: "Desk Lamp",            category: "Home",        price: 29.99,  oldPrice: 44.99,  rating: 4.2, reviews: 156, icon: "💡" },
    { id: 8,  name: "Bestselling Novel",    category: "Books",       price: 14.99,  oldPrice: null,   rating: 4.7, reviews: 892, icon: "📚" },
    { id: 9,  name: "Bluetooth Speaker",   category: "Electronics",  price: 59.99,  oldPrice: 79.99,  rating: 4.5, reviews: 43,  icon: "🔊" },
    { id: 10, name: "Denim Jacket",         category: "Fashion",     price: 79.99,  oldPrice: null,   rating: 4.3, reviews: 67,  icon: "🧥" },
    { id: 11, name: "Air Fryer",            category: "Home",        price: 89.99,  oldPrice: 119.99, rating: 4.7, reviews: 28,  icon: "🍳" },
    { id: 12, name: "Gaming Controller",   category: "Toys & Games", price: 44.99,  oldPrice: null,   rating: 4.6, reviews: 15,  icon: "🎮" },
    { id: 13, name: "Sneakers",             category: "Fashion",     price: 54.99,  oldPrice: 74.99,  rating: 4.2, reviews: 310, icon: "👠" },
    { id: 14, name: "Science Fiction Book", category: "Books",       price: 12.99,  oldPrice: null,   rating: 4.4, reviews: 204, icon: "🚀" },
    { id: 15, name: "Resistance Bands",    category: "Sports",       price: 19.99,  oldPrice: 29.99,  rating: 4.5, reviews: 512, icon: "💪" },
    { id: 16, name: "Board Game",          category: "Toys & Games", price: 34.99,  oldPrice: null,   rating: 4.8, reviews: 88,  icon: "🎲" },
];

function stars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}

function productCard(p) {
    return `
    <div class="product-card">
        <div class="product-img">${p.icon}</div>
        <div class="product-info">
            <div class="product-category">${p.category}</div>
            <div class="product-name">${p.name}</div>
            <div class="product-rating">${stars(p.rating)} <span>(${p.reviews})</span></div>
            <div class="product-price-row">
                <span class="price">$${p.price.toFixed(2)}</span>
                ${p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : ""}
            </div>
            <button class="add-cart-btn" onclick="addToCart(${p.id},'${p.name}',${p.price})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    </div>`;
}

// ── Filters & Sort ────────────────────────────────────────────────────────────
function updatePriceLabel(val) {
    document.getElementById("priceLabel").textContent = `$${val}`;
}

window.updatePriceLabel = updatePriceLabel;

function applyFilters() {
    const checkedCategories = [...document.querySelectorAll(".filter-group input[type=checkbox]:checked")]
        .map(cb => cb.value);

    const maxPrice = parseInt(document.getElementById("priceRange").value);

    const minRating = parseFloat(
        document.querySelector("input[name=rating]:checked")?.value || "0"
    );

    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const sort = document.getElementById("sortSelect").value;

    let results = allProducts.filter(p => {
        if (checkedCategories.length && !checkedCategories.includes(p.category)) return false;
        if (p.price > maxPrice) return false;
        if (p.rating < minRating) return false;
        if (query && !p.name.toLowerCase().includes(query)) return false;
        return true;
    });

    if (sort === "price-asc")  results.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
    if (sort === "rating")     results.sort((a, b) => b.rating - a.rating);

    const grid = document.getElementById("productGrid");
    document.getElementById("productCount").textContent = `(${results.length})`;

    if (results.length === 0) {
        grid.innerHTML = `<div class="no-results"><i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block;"></i>No products found. Try adjusting your filters.</div>`;
    } else {
        grid.innerHTML = results.map(productCard).join("");
    }
}

window.applyFilters = applyFilters;

function clearFilters() {
    document.querySelectorAll(".filter-group input[type=checkbox]").forEach(cb => cb.checked = false);
    document.querySelector("input[name=rating][value='0']").checked = true;
    document.getElementById("priceRange").value = 300;
    document.getElementById("priceLabel").textContent = "$300";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "default";
    applyFilters();
}

window.clearFilters = clearFilters;

applyFilters();
