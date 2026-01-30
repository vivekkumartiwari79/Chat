import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getDatabase } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpXv6AvjdLdsQxHUwZqJEqWvyQhWUZzUM",
  authDomain: "contactme-14cbd.firebaseapp.com",
  databaseURL: "https://contactme-14cbd-default-rtdb.firebaseio.com",
  projectId: "contactme-14cbd",
  storageBucket: "contactme-14cbd.firebasestorage.app",
  messagingSenderId: "102010546223",
  appId: "1:102010546223:web:01f09de7f70462c2a7feda"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
