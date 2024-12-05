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
