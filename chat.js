import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* 🔐 Auth check */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

/* 🔥 Firebase reference */
const messagesRef = ref(db, "messages");

/* 🎯 DOM */
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

/* 📤 Send message */
sendBtn.addEventListener("click", () => {
  if (!chatInput.value.trim()) return;

  push(messagesRef, {
    user: auth.currentUser.email,
    text: chatInput.value,
    time: Date.now()
  });

  chatInput.value = "";
});

/* 📥 Receive messages */
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();

  const div = document.createElement("div");
  div.innerHTML = `<strong>${msg.user}</strong>: ${msg.text}`;

  chatBox.appendChild(div);
});
