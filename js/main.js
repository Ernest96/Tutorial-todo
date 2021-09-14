const firebaseConfig = {
    apiKey: "AIzaSyAe435vk_RCs4sfUM4vSAnNnDm4breuxio",
    authDomain: "abcode-todo.firebaseapp.com",
    projectId: "abcode-todo",
    storageBucket: "abcode-todo.appspot.com",
    messagingSenderId: "904640387550",
    appId: "1:904640387550:web:beba6b41b105f72fce254f"
};

// setam firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = function () {
    auth.signOut();
}

auth.onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser != null) {
        logoutBtn.style.visibility = "visible";
    }
})