import {postRegisterToApi} from "/src/js/api/register";

const registerForm = document.getElementById("register");

export async function onRegister(event) {
    event.preventDefault();


    const name = registerForm.name.value.trim();
    const url = registerForm.url.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();

    postRegisterToApi(name, url, email, password);
}

registerForm.addEventListener("submit", onRegister);

