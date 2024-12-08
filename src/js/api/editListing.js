import { API_KEY, API_ALL_LISTINGS } from "/src/js/ui/constants";
import { id } from "/src/js/router/views/editListing";

const editListingForm = document.getElementById("edit-listing-form");
const editListingImgInputCont = document.getElementById("edit-listing-img-input-cont");


export async function getEditListingFormValue(id) {
    try {

        const response = await fetch(`${API_ALL_LISTINGS}/${id}`);

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data = await response.json();
        const api = data.data;

        //console.log(api);


        populateEditListingForm(api);
       
    } catch (error) {
        // Handle the error and redirect if editing fails
        console.error("Error message: " + error);
    }
}


function populateEditListingForm(api){
    const endsAtDate = new Date(api.endsAt);
    const hours = String(endsAtDate.getUTCHours()).padStart(2, '0');
    const minutes = String(endsAtDate.getUTCMinutes()).padStart(2, '0');
    const day = String(endsAtDate.getUTCDate()).padStart(2, '0');
    const month = String(endsAtDate.getUTCMonth() + 1).padStart(2, '0');
    const year = endsAtDate.getUTCFullYear();

    const formattedTime = `${hours}:${minutes}`;
    
    const formattedDate = `${year}-${month}-${day}`;

    //console.log(formattedTime);
    //console.log(editListingForm.endsAtTime.value)

    const imgArray = api.media;

    //console.log(imgArray);

    for (let i = 1; i < imgArray.length; i++) {
        const img = imgArray[i].url;
        //console.log(img);

        const newImageInputWrapper = document.createElement("div");
            newImageInputWrapper.className = "edit-image-input-wrapper flex";
    
            const newImageInput = document.createElement("input");
            newImageInput.type = "text";
            newImageInput.name = `img${editListingImgInputCont.querySelectorAll("input").length + 1}`;
            newImageInput.title = "Legg inn URL-en til bildet du ønsker";
            newImageInput.className = "w-full px-4 py-2 border border-[#3C655D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C655D] mt-4";
    
            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.innerText = "X";
            removeButton.className = "ml-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg";
            removeButton.addEventListener("click", () => {
                editListingImgInputCont.removeChild(newImageInputWrapper);
            });
    
            newImageInputWrapper.appendChild(newImageInput);
            newImageInputWrapper.appendChild(removeButton);
            editListingImgInputCont.appendChild(newImageInputWrapper);

            newImageInput.value = img;


    }



    editListingForm.img1.value = api.media[0].url;
    editListingForm.title.value = api.title;
    editListingForm.endsAtDate.value = formattedDate;
    editListingForm.endsAtTime.value = formattedTime;
    editListingForm.desc.value = api.description;
}



const alertEditListing = document.getElementById("alert-edit-listing");

export async function updateListingToApi(url, title, endsAt, desc) {
    try {
        const options = {
          method: "put",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
                "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            endsAt: endsAt,
            description: desc,
            media: url
            
          }),
        };
    
        const response = await fetch(`${API_ALL_LISTINGS}/${id}`, options);


   if (response.ok) {

      console.log("Listing posted");
        window.location = "/minside/";
    

      
    } else {
        console.log(response);

        console.log("Failed to post listing");

        alertEditListing.innerText = "Klarer ikke poste annonsen";
        
        
      
    }
  } catch (error) {
    console.error(error.message);
    console.error("Failed to post listing");
    alertEditListing.innerText = "Klarer ikke poste annonsen";
    
    
  }
}
