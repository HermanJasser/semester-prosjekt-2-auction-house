import { API_KEY, API_ALL_PROFILES } from "/src/js/ui/constants";

const profilInfo = document.getElementById("profil-info");
const  creditAvailable = document.getElementById("credit-available");

export async function getMyProfile() {
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
        listMyProfile(api);
        listMyCredit(api);
    } catch (error) {
        console.error("Error message: " + error);
        profilInfo.innerHTML = `<h2 class="text-center">Finner ikke profilen din</h2>`;

    }
}

export async function getMyListings() {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        };
    

        const response = await fetch(`${API_ALL_PROFILES}/${localStorage.username}/listings?_bids=true`, options);

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data = await response.json();
        const api = data.data;
        if(api.length === 0){
            myListingsCont.innerHTML = `<h2 class="text-center justify-center">Ingen annonser</h2>`;
            myListingsCont.classList.add("flex", "justify-center", "items-center", "h-[100px]");
            myListingsCont.classList.remove("grid", "gap-8", "sm:grid-cols-2", "lg:grid-cols-3");
            
            return;
        } else{
            listMyPosts(api);
        }
        

    } catch (error) {
        console.error("Error message: " + error);
        profilInfo.innerHTML = `<h2 class="text-center">Finner ikke profilen din</h2>`;

    }
}

function listMyProfile(api) {
    profilInfo.innerHTML = "";
    profilInfo.innerHTML = `
    <img
    src="${api.avatar.url}"
    alt="${api.avatar.alt}"
    class="w-24 h-24 mx-auto rounded-full object-cover md:w-32 md:h-32"
  />
  <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#000]">${api.name}</h1>
    `;
}



function listMyCredit(api) {
    creditAvailable.innerHTML = "";
    creditAvailable.innerHTML = `
    <p class="text-[#3C655D] text-sm font-medium">Disponibel kreditt:</p>
    <p class="text-xl md:text-2xl font-bold text-[#000]">
      ${api.credits}.-
    </p>
    `;
}



const myListingsCont = document.getElementById("mine-annonser");

function listMyPosts(api){

    myListingsCont.innerHTML = "";
    let container = "";
   // console.log(api);

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

        function getLastBid(bids) {
          if (!bids || bids.length === 0) {
              return 'Ingen bud'; 
          }
          return bids[bids.length - 1].amount; 
      }

      const bids = getLastBid(api[i].bids);
     // console.log(bids);

        container += `
       <a
    href="/enkelpost/?id=${api[i].id}"
    class="w-full max-w-md mx-auto bg-[#C9E9DA] rounded-lg shadow-lg overflow-hidden"
  >
    <img
      src="${mediaUrl}"
      alt="${mediaAlt}"
      onerror="this.src='https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';"
      class="w-full h-[231px] object-cover"
    />


    <div class="p-4">
  
      <h2 class="text-center text-black text-lg font-bold">${api[i].title}</h2>

      <div class="flex justify-between mt-4">
    
        <div class="text-center">
          <p class="text-[#3C655D] text-sm font-semibold">Avslutter</p>
          <p class="text-black text-sm font-medium">${formattedTime}</p>
          <p class="text-black text-sm font-medium">${formattedDate}</p>
        </div>

    
        <div class="text-center">
          <p class="text-[#3C655D] text-sm font-semibold">Bud</p>
          <p class="text-black text-sm font-medium">${bids}</p>
        </div>
        
      </div>
      </div>
  </a>

        `;
    }
    
    myListingsCont.innerHTML = container;
}
