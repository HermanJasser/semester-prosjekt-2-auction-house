import { API_REGISTER } from "/src/js/ui/constants";
import { redirectIfLoggedIn } from "/src/js/ui/isLoggedIn";

redirectIfLoggedIn();

const alertRegister = document.getElementById("alert-register");

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

        if(errorData.errors[0].message == "Image URL must be valid URL"){
            alertRegister.innerText = "Bilde URL må være en gyldig URL"
        } else if(errorData.errors[0].message.includes("Image is not accessible")){
            alertRegister.innerText = "Bilde er ikke tilgjengelig"
        } else if(errorData.errors[0].message == "Profile already exists"){
            alertRegister.innerText = "Brukeren finnes allerede"
        } else {
            alertRegister.innerText = "Klarer ikke oprette bruker";
            //alertRegister.innerText = errorData.errors[0].message;
        }
        
        
      
    }
  } catch (error) {
    console.error(error.message);
    alertRegister.innerText = "Kan ikke koble til serveren. Vennligst prøv igjen senere";
    
  }
}