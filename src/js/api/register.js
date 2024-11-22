import { API_REGISTER } from "/src/js/ui/constants";

const alertLogin = document.getElementById("alert-login");

export async function postRegisterToApi(name, url, email, password){
    try {
        const options = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            avatar:{
                url: url,
            }
          }),
        };
    
        const response = await fetch(API_REGISTER, options);
        //console.log(response);

   if (response.ok) {
      const data = await response.json();
    

      window.alert("Bruker er opprettet");

      window.location = "/login/";
    } else {
        const errorData = await response.json();
        alertLogin.innerText = errorData.errors[0].message;
      
    }
  } catch (error) {
    console.error(error.message);
    alertLogin.innerText = "Kan ikke koble til serveren. Vennligst prøv igjen senere";
    
  }
}