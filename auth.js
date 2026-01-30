import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ===== LOGIN FORM =====
document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email aur password required hai");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user info in database
        update(ref(db, "users/" + user.uid), {
          email: user.email,
          lastLogin: new Date().toISOString()
        });

        // Redirect to chat page
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});

// ===== AUTO LOGIN CHECK =====
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname.split("/").pop();

  if (!user) {
    // If not logged in and not on login page, send to login.html
    if (currentPage !== "login.html") {
      window.location.href = "login.html";
    }
  } else {
    // If logged in and on login page, redirect to index.html
    if (currentPage === "login.html") {
      window.location.href = "index.html";
    }
    // If already on index.html, stay here (no redirect to contact.html)
  }
});
