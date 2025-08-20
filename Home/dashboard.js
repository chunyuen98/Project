// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase config
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
const auth = getAuth(app);

// Protect route — redirect if not logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../Login/login.html";
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../Login/login.html";
    }).catch((error) => {
        console.error("Logout error:", error);
    });
});
