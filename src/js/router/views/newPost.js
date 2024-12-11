import { isValidImageUrl } from "/src/js/ui/checkImg";
import { postListingToApi } from "/src/js/api/newPost";




    const addImageBtn = document.getElementById("add-image-btn");
    const imgInputCont = document.getElementById("img-input-cont");
    const imgInputError = document.getElementById("img-input-error");
    
  
    addImageBtn.addEventListener("click", async () => {
        const lastImageInputWrapper = imgInputCont.querySelector(".image-input-wrapper:last-of-type");
    const lastImageInput = lastImageInputWrapper.querySelector("input");
        const url = lastImageInput.value;
    
        if (await isValidImageUrl(url)) {
            const newImageInputWrapper = document.createElement("div");
            newImageInputWrapper.className = "image-input-wrapper flex";
    
            const newImageInput = document.createElement("input");
            newImageInput.type = "text";
            newImageInput.name = `img${imgInputCont.querySelectorAll("input").length + 1}`;
            newImageInput.title = "Legg inn URL-en til bildet du ønsker";
            newImageInput.className = "w-full px-4 py-2 border border-[#3C655D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C655D] mt-4";
    
            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.innerText = "X";
            removeButton.className = "ml-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600";
            removeButton.addEventListener("click", () => {
                imgInputCont.removeChild(newImageInputWrapper);
            });
    
            newImageInputWrapper.appendChild(newImageInput);
            newImageInputWrapper.appendChild(removeButton);
            imgInputCont.appendChild(newImageInputWrapper);
            imgInputError.innerText = "";
        } else {
            imgInputError.innerText = "Bilde URL må være en gyldig URL";
        }
    });

    



    const newListingForm = document.getElementById("new-listing-form");
    const alertNewListing = document.getElementById("alert-new-listing");

export async function onSubmitListing(event) {
    event.preventDefault();

    alertNewListing.innerText = "";
    const imageUrls = await getAllImageUrls();

    if (imageUrls === undefined) {
        alertNewListing.innerText = "En eller flere bilde-URL-er er ugyldige";
        return;
    } else {
        console.log("Alle bilde-URL-er er gyldige.");
    }

    //console.log(imageUrls);
    //console.log("hei");


    
    const title = newListingForm.title.value.trim();
    const endsAtDate = newListingForm.endsAtDate.value.trim();
    const endsAtTime = newListingForm.endsAtTime.value.trim();

    
    const desc = newListingForm.desc.value.trim();

    if (imageUrls.length < 1) {
        alertNewListing.innerText = "Du må legge til minst ett bilde";
        return;
    } else if(!title) {
        alertNewListing.innerText = "Tittel kan ikke være tom";
        return;
    } else if (!endsAtDate || !endsAtTime) {
        alertNewListing.innerText = "Sluttdato og tid kan ikke være tom";
        return;
    }


   

    const endsAt = new Date(`${endsAtDate}T${endsAtTime}:00`).toISOString();

     if (endsAt < new Date().toISOString()) {
        alertNewListing.innerText = "Sluttdato må være i fremtiden";
        return;
    } else if (!desc) {
        alertNewListing.innerText = "Beskrivelse kan ikke være tom";
        return;
    } 
    

   // console.log(imageUrls, title, endsAt, desc);

    postListingToApi(imageUrls, title, endsAt, desc)


}

newListingForm.addEventListener("submit", onSubmitListing);
  


    


async function getAllImageUrls() {
    const imageInputs = imgInputCont.querySelectorAll(".image-input-wrapper input");
   // console.log(imageInputs);
    const imageUrls = [];
    for (const input of imageInputs) {
        if (input.value) {
            const isValid = await isValidImageUrl(input.value);
            if (isValid) {
                imageUrls.push({ url: input.value });
            } else {
                alertNewListing.innerText = "Bilde URL må være en gyldig URL";
                return;
            }
        }
    }
    return imageUrls;
}

