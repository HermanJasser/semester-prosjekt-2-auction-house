import {postLoginToApi} from "/src/js/api/login";
import { redirectIfLoggedIn } from "/src/js/ui/isLoggedIn";

redirectIfLoggedIn();

const loginForm = document.getElementById("login");
const loginAlert = document.getElementById("alert-login");

export async function onLogin(event) {
    event.preventDefault();

    loginAlert.innerText = "";

    const emailPattern = /^[\w\-.]+@(stud\.)?noroff\.no$/;

    const email = loginForm.email.value.trim();
    if (!emailPattern.test(email)) {
        loginAlert.innerText = "Eposten må være en gyldig stud.noroff.no adresse.";
        return; 
      }

    const password = loginForm.password.value.trim();
    if (password.length < 8) {
        loginAlert.innerText = "Passordet må være minst 8 tegn langt.";
        return; 
      }

    postLoginToApi(email, password);
}

loginForm.addEventListener("submit", onLogin);

const emailLoginInput = document.getElementById("emailLogin");

