import { API_KEY, API_ALL_PROFILES } from "/src/js/ui/constants";
import { isValidImageUrl } from "/src/js/ui/checkImg";

const profilInfoEdit = document.getElementById("profil-info-edit");

const urlProfilImg = document.getElementById("urlProfilImg");


export async function getMyProfileEdit() {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        };
    

        const response = await fetch(`${API_ALL_PROFILES}/${localStorage.username}`, options);

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data = await response.json();
        const api = data.data;
        
        urlProfilImg.value = api.avatar.url;

        //console.log(api)
        listMyProfileEdit(api)
   
    } catch (error) {
        console.error("Error message: " + error);

    }
}

function listMyProfileEdit(api) {
    profilInfoEdit.innerHTML = "";
    profilInfoEdit.innerHTML = `
    <img
    src="${api.avatar.url}"
    alt="${api.avatar.alt}"
    class="w-24 h-24 mx-auto rounded-full object-cover md:w-32 md:h-32"
  />
  <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#000]">${api.name}</h1>
    `;
}


export async function updateProfile() {
    try {
        const url = urlProfilImg.value ;
        const editProfileAlert = document.getElementById("edit-profile-error");

        const isValidImage = await isValidImageUrl(url);
        if (!isValidImage) {
            editProfileAlert.innerText = "Bilde URL må være en gyldig URL"
            return;
        }

        const options = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                avatar: {
                    url: url,

                },
            }),
        };

        const response = await fetch(`${API_ALL_PROFILES}/${localStorage.username}`, options);
       // console.log(response)
       // console.log(options)


        if (response.ok) {
            //console.log("Post updated");
            window.location = "/minside/";
        } else {    
        const errorData = await response.json();

            if(errorData.errors[0].message == "Image URL must be valid URL"){
                editProfileAlert.innerText = "Bilde URL må være en gyldig URL"
                console.log("Image URL must be valid URL");
            } else if(errorData.errors[0].message.includes("Image is not accessible")){
                editProfileAlert.innerText = "Bilde er ikke tilgjengelig";
                console.log("Image is not accessible");
            } else {
                editProfileAlert.innerText = "Noe gikk galt";
                console.log("failed to update post");
            }
        }

    

    } catch (error) {
        editProfileAlert.innerText = "Noe gikk galt";
       console.log("failed to update post");
    }
}

