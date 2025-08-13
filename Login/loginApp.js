// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase config (your provided credentials)
const firebaseConfig = {
    apiKey: "AIzaSyC-ChjVrVGSPC5O9c6N_SviSJOj9QIQLoc",
    authDomain: "project-b06e7.firebaseapp.com",
    projectId: "project-b06e7",
    storageBucket: "project-b06e7.firebasestorage.app",
    messagingSenderId: "632273807013",
    appId: "1:632273807013:web:4825492cd4624c64f28f4c",
    measurementId: "G-ZEJNTFRS7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Clear previous error
    errorMessage.textContent = "";

    // Firebase Auth Login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log("Logged in as:", user.email);
            alert("Login successful!");
            window.location.href = "../Home/home.html"; // Redirect to home page
        })
        .catch((error) => {
            // Show error message
            console.error("Login Error:", error);
            if (error.code === "auth/user-not-found") {
                errorMessage.textContent = "No account found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage.textContent = "Incorrect password. Please try again.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage.textContent = "Invalid email format.";
            } else {
                errorMessage.textContent = error.message;
            }
        });
});
