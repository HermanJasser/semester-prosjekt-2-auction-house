import { API_ALL_PROFILES, API_KEY } from "/src/js/ui/constants";
import { convertTimeFormat, convertDateformat } from "/src/js/ui/convertTimeFormat";

const myKjopOutput = document.getElementById("mine-kjop");

export async function getMyWins() {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        };
    

        const response = await fetch(`${API_ALL_PROFILES}/${localStorage.username}/wins/?_listings=true`, options);

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data = await response.json();
        const api = data.data;
        console.log(api);
        if(api.length === 0){
            myKjopOutput.innerHTML = `<h2 class="text-center">Du har ingen kjøp enda</h2>`;
            
            return;
        }

        listWins(api)
        
        

       
   
    } catch (error) {
        console.error("Error message: " + error);

    }
}

function listWins(api) {
    
    myKjopOutput.innerHTML = "";

   

    let container = "";

    for (let i = 0; i < api.length; i++) {

        let mediaUrl = api[i].media[0] && api[i].media[0].url 
            ? api[i].media[0].url 
            : 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';
  
        let mediaAlt = api[i].media[0] && api[i].media[0].alt 
            ? api[i].media[0].alt 
            : 'Placeholder image';


        const formattedTime = convertTimeFormat(api[i].endsAt);
        const formattedDate = convertDateformat(api[i].endsAt);


  
          
  
          container += `
            <a href="/enkelpost/?id=${api[i].id}">
       <div class="flex justify-between items-center h-[100px] px-4 py-4 mb-8 bg-[#C9E9DA] md:px-16 md:h-[150px] rounded-lg shadow-lg">
        <img class="h-full " src="${mediaUrl}" alt="${mediaAlt}">
        <h2 class="text-center text-black text-lg font-bold">${api[i].title}</h2>
        <div class="text-center">
          <p class="text-[#3C655D] text-sm font-semibold">Avslutter</p>
          <p class="text-black text-sm font-medium">${formattedTime}</p>
          <p class="text-black text-sm font-medium">${formattedDate}</p>
        </div>

       </div>
         </a>
  
          `;
      }

      myKjopOutput.innerHTML = container;


}
