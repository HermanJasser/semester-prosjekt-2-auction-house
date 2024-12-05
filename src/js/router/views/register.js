import {postRegisterToApi} from "/src/js/api/register";
import { redirectIfLoggedIn } from "/src/js/ui/isLoggedIn";

redirectIfLoggedIn();

const registerForm = document.getElementById("register");
const alertRegister = document.getElementById("alert-register");

export async function onRegister(event) {
    event.preventDefault();

    alertRegister.innerText = "";

    const emailPattern = /^[\w\-.]+@(stud\.)?noroff\.no$/;

    const name = registerForm.name.value.trim();
    const url = registerForm.url.value.trim();
    const email = registerForm.email.value.trim();
    if (!emailPattern.test(email)) {
        alertRegister.innerText = "Eposten må være en gyldig stud.noroff.no adresse.";
        return; 
      }
    const password = registerForm.password.value.trim();
    if (password.length < 8) {
        alertRegister.innerText = "Passordet må være minst 8 tegn langt.";
        return; 
      }

    postRegisterToApi(name, url, email, password);
}

registerForm.addEventListener("submit", onRegister);

