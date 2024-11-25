import { API_LOGIN } from "/src/js/ui/constants";
import { redirectIfLoggedIn } from "/src/js/ui/isLoggedIn";

redirectIfLoggedIn();

const loginAlert = document.getElementById("alert-login");
//console.log(loginAlert)

export async function postLoginToApi(email, password) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch(API_LOGIN, options);

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("username", data.data.name);
            localStorage.setItem("token", data.data.accessToken);

            location.href = "/";
        } else {

            //const errorData = await response.json();
            loginAlert.innerText = "Feil Email eller Passord ";
        }
    } catch (error) {
        loginAlert.innerText = "Kan ikke koble til serveren. Vennligst prøv igjen senere";
        console.error(error.message);
    }
}
