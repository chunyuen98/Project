import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
    const pwd = document.getElementById("password");
    const isHidden = pwd.type === "password";
    pwd.type = isHidden ? "text" : "password";
    this.classList.toggle("fa-eye", !isHidden);
    this.classList.toggle("fa-eye-slash", isHidden);
});

function showError(msg) {
    const box  = document.getElementById("errorMsg");
    const text = document.getElementById("errorText");
    if (!box || !text) return;
    text.textContent = msg;
    box.classList.remove("hidden");
}

function hideError() {
    const box = document.getElementById("errorMsg");
    if (!box) return;
    box.classList.add("hidden");
}

function setLoading(on) {
    const btn = document.getElementById("loginBtn");
    btn.disabled = on;
    btn.classList.toggle("loading", on);
    btn.querySelector(".btn-text").textContent = on ? "Signing in…" : "Sign In";
}

const ERRORS = {
    "auth/user-not-found":    "No account found with this email.",
    "auth/wrong-password":    "Incorrect password. Please try again.",
    "auth/invalid-email":     "Invalid email format.",
    "auth/invalid-credential":"Invalid email or password.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/user-disabled":     "This account has been disabled.",
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    hideError();

    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "../Home/dashboard.html";
        })
        .catch((err) => {
            setLoading(false);
            console.error("Login error code:", err.code);
            showError(ERRORS[err.code] || `Something went wrong. (${err.code})`);
        });
});
