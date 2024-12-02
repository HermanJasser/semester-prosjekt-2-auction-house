import { API_ALL_LISTINGS } from "/src/js/ui/constants";

const listingOutput = document.getElementById("listings-output")


export async function getAllListingsFromApi(page) {
    try {
      const URL = `${API_ALL_LISTINGS}?sort=created&sortOrder=desc&limit=12&page=${page}&_bids=true&_active=true`
        const response = await fetch(URL);
        const data = await response.json();
        const api = data.data;
        listListings(api);
    } catch (error) {
        listingOutput.innerHTML = "";
        listingOutput.innerHTML = "<p>Kan ikke koble til serveren. Vennligst prøv igjen senere</p>";
        console.error(error.message);
    }
}

export async function getSearchedListingsFromApi(query,page) {
  try {
    const URL = `${API_ALL_LISTINGS}search?q=<${query}>`
      const response = await fetch(URL);
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

    for (let i = 0; i < api.length; i++) {

      let mediaUrl = api[i].media[0] && api[i].media[0].url 
          ? api[i].media[0].url 
          : 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';

      let mediaAlt = api[i].media[0] && api[i].media[0].alt 
          ? api[i].media[0].alt 
          : 'Placeholder image';

          const endsAtDate = new Date(api[i].endsAt);
        const hours = String(endsAtDate.getUTCHours()).padStart(2, '0');
        const minutes = String(endsAtDate.getUTCMinutes()).padStart(2, '0');
        const day = String(endsAtDate.getUTCDate()).padStart(2, '0');
        const month = String(endsAtDate.getUTCMonth() + 1).padStart(2, '0');
        const year = endsAtDate.getUTCFullYear();

        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = `${day}.${month}.${year}`;

        const bids = api[i].bids[0] && api[i].bids[0].amount
            ? api[i].bids[0].amount
            : 'Ingen bud';

        container += `
       <a
    href="/singleListing/?id=${api[i].id}"
    class="w-full max-w-md mx-auto bg-[#C9E9DA] rounded-lg shadow-lg overflow-hidden"
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
        <div class="text-center">
          <p class="text-[#3C655D] text-sm font-semibold">Avslutter</p>
          <p class="text-black text-sm font-medium">${formattedTime}</p>
          <p class="text-black text-sm font-medium">${formattedDate}</p>
        </div>

        <!-- Bid -->
        <div class="text-center">
          <p class="text-[#3C655D] text-sm font-semibold">Bud</p>
          <p class="text-black text-sm font-medium">${bids}</p>
        </div>
      </div>
    </div>
  </a>

        `;
    }
    
    listingOutput.innerHTML = container;
}






