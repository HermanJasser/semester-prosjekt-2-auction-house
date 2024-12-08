import { API_ALL_LISTINGS, API_KEY } from "/src/js/ui/constants.js";

const alertNewListing = document.getElementById("alert-new-listing");

export async function postListingToApi(url, title, endsAt, desc) {
    try {
        const options = {
          method: "post",
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
    
        const response = await fetch(API_ALL_LISTINGS, options);


   if (response.ok) {

      console.log("Listing posted");
        window.location = "/minside/";
    

      
    } else {
        console.log(response);

        console.log("Failed to post listing");

        //alertNewListing.innerText = "Klarer ikke poste annonsen";
        
        
      
    }
  } catch (error) {
    console.error(error.message);
    console.error("Failed to post listing");
    
    
  }
}