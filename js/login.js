
const logInSection = document.getElementById("log-in");
const logInBtn = document.getElementById("login-btn");

const provider = new firebase.auth.GoogleAuthProvider();

logInBtn.onclick = function () {
    console.log("logare...")
    auth.signInWithPopup(provider);
}

auth.onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser != null) {
        window.location = "pages/todos.html";
    }
    else {
        logInSection.style.visibility = "visible";
    }
})