import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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
    const pwd = document.getElementById("signupPassword");
    const isHidden = pwd.type === "password";
    pwd.type = isHidden ? "text" : "password";
    this.classList.toggle("fa-eye", !isHidden);
    this.classList.toggle("fa-eye-slash", isHidden);
});

function showError(msg) {
    const box = document.getElementById("errorMsg");
    document.getElementById("errorText").textContent = msg;
    box.classList.remove("hidden");
    document.getElementById("successMsg").classList.add("hidden");
}

function showSuccess(msg) {
    const box = document.getElementById("successMsg");
    document.getElementById("successText").textContent = msg;
    box.classList.remove("hidden");
    document.getElementById("errorMsg").classList.add("hidden");
}

function hideMessages() {
    document.getElementById("errorMsg").classList.add("hidden");
    document.getElementById("successMsg").classList.add("hidden");
}

function setLoading(on) {
    const btn = document.getElementById("signupBtn");
    btn.disabled = on;
    btn.classList.toggle("loading", on);
    btn.querySelector(".btn-text").textContent = on ? "Creating account…" : "Create Account";
}

const ERRORS = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email":        "Invalid email format.",
    "auth/weak-password":        "Password must be at least 6 characters.",
};

document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    hideMessages();

    const email    = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showSuccess("Account created! Redirecting to sign in…");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        })
        .catch((err) => {
            setLoading(false);
            showError(ERRORS[err.code] || "Something went wrong. Please try again.");
        });
});
