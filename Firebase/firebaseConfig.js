import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEro4ebmBbj7p55YGvFAZkVnr5FW3EokA",
    authDomain: "axes-and-bows-c2171.firebaseapp.com",
    projectId: "axes-and-bows-c2171",
    storageBucket: "axes-and-bows-c2171.firebasestorage.app",
    messagingSenderId: "1060934668603",
    appId: "1:1060934668603:web:d3464a478987d1f973671e",
    measurementId: "G-LVCP5LR3T2"
  };


// Inicializar Firebase  
const app = initializeApp(firebaseConfig);

// Exportar para usar en otras partes
const db = getFirestore(app);
const auth = getAuth(app);



export { db, auth};

