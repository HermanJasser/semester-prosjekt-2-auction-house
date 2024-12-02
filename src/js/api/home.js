import { API_ALL_LISTINGS } from "/src/js/ui/constants";

const listingOutput = document.getElementById("listings-output")

export async function getAllListingsFromApi() {
    try {
        const response = await fetch(API_ALL_LISTINGS);

        const data = await response.json();

        const api = data.data;


        listListings(api);

        
    } catch (error) {
        listingOutput.innerHTML = "";
        listingOutput.innerHTML = "<p>Kan ikke koble til serveren. Vennligst prøv igjen senere</p>";
        console.error(error.message);
    }
}





function listListings(api) {
    listingOutput.innerHTML = "";
    let container = "";
    //console.log(api[0].media[0].url);
    

    for (let i = 0; i < 12 && i < api.length; i++) {

      let mediaUrl = api[i].media[0] && api[i].media[0].url 
          ? api[i].media[0].url 
          : 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';

      let mediaAlt = api[i].media[0] && api[i].media[0].alt 
          ? api[i].media[0].alt 
          : 'Placeholder image';



        container += `
       <a
    href="/singleListing/?id=${api[i].id}"
    class="w-full max-w-md mx-auto bg-[#C9E9DA] rounded-lg shadow-md overflow-hidden"
  >
    <!-- Product Image -->
    <img
      src="${mediaUrl}"
      alt="${mediaAlt}"
      class="w-full h-[231px] object-cover"
    />

    <!-- Product Details -->
    <div class="p-4">
      <!-- Title -->
      <h2 class="text-center text-black text-lg font-bold">${api[i].title}</h2>

      <div class="flex justify-between mt-4">
        <!-- Ends At -->
        <div class="text-left">
          <p class="text-[#3C655D] text-sm font-semibold">Avslutter</p>
          <p class="text-black text-sm font-medium">${api[i].endsAt}</p>
        </div>

        <!-- Bid -->
        <div class="text-right">
          <p class="text-[#3C655D] text-sm font-semibold">Bud</p>
          <p class="text-black text-sm font-medium">10</p>
        </div>
      </div>
    </div>
  </a>

        `;
    }
    
console.log(container)
    listingOutput.innerHTML = container;
}




