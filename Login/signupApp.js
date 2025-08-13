// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

// Handle Sign Up Form Submission
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const errorMessage = document.getElementById("signup-error");
    const successMessage = document.getElementById("signup-success");

    // Clear previous messages
    errorMessage.textContent = "";
    successMessage.textContent = "";

    // Basic password validation
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Firebase Auth Signup
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;
            console.log("Account created for:", user.email);

            successMessage.textContent = "Account created successfully! Redirecting to login...";
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect to login page
            }, 2000);
        })
        .catch((error) => {
            // Handle errors
            console.error("Signup Error:", error);
            if (error.code === "auth/email-already-in-use") {
                errorMessage.textContent = "This email is already registered.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage.textContent = "Invalid email format.";
            } else if (error.code === "auth/weak-password") {
                errorMessage.textContent = "Password is too weak.";
            } else {
                errorMessage.textContent = error.message;
            }
        });
});
