
import{getEditListingFormValue} from "/src/js/api/editListing";

let params = new URL(document.location).searchParams;
export let id = params.get("id");

getEditListingFormValue(id);






import { isValidImageUrl } from "/src/js/ui/checkImg";
import { updateListingToApi } from "/src/js/api/editListing";




    const editAddImageBtn = document.getElementById("edit-add-image-btn");
    const editImgInputError = document.getElementById("edit-listing-img-input-error");
    const editListingImgInputCont = document.getElementById("edit-listing-img-input-cont");
    
  
    editAddImageBtn.addEventListener("click", async () => {
        const lastImageInputWrapper = editListingImgInputCont.querySelector(".edit-image-input-wrapper:last-of-type");
    const lastImageInput = lastImageInputWrapper.querySelector("input");
        const url = lastImageInput.value;
    
        if (await isValidImageUrl(url)) {
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
            editImgInputError.innerText = "";
        } else {
            editImgInputError.innerText = "Bilde URL må være en gyldig URL";
        }
    });

    



    const editListingForm = document.getElementById("edit-listing-form");
    const alertEditListing = document.getElementById("alert-edit-listing");

export async function onSubmitListing(event) {
    event.preventDefault();

    alertEditListing.innerText = "";
    const imageUrls = await getAllImageUrls();

    if (imageUrls === undefined) {
        alertEditListing.innerText = "En eller flere bilde-URL-er er ugyldige";
        return;
    } else {
        console.log("Alle bilde-URL-er er gyldige.");
    }



    
    const title = editListingForm.title.value.trim();

    const desc = editListingForm.desc.value.trim();

    if (imageUrls.length < 1) {
        alertEditListing.innerText = "Du må legge til minst ett bilde";
        return;
    } else if(!title) {
        alertEditListing.innerText = "Tittel kan ikke være tom";
        return;
    } else if (!desc) {
        alertEditListing.innerText = "Beskrivelse kan ikke være tom";
        return;
    } 
    


   updateListingToApi(imageUrls, title, desc)


}

editListingForm.addEventListener("submit", onSubmitListing);
  


    


async function getAllImageUrls() {
    const imageInputs = editListingImgInputCont.querySelectorAll(".edit-image-input-wrapper input");
    const imageUrls = [];
    for (const input of imageInputs) {
        if (input.value) {
            const isValid = await isValidImageUrl(input.value);
            if (isValid) {
                imageUrls.push({ url: input.value });
            } else {
                alertEditListing.innerText = "Bilde URL må være en gyldig URL";
                return;
            }
        }
    }
    return imageUrls;
}