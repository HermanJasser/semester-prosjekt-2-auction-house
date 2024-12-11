import { API_ALL_LISTINGS, API_KEY, API_ALL_PROFILES } from "../ui/constants";
import { id } from "/src/js/router/views/singleListing";

const singleListingOutput = document.getElementById("single-listing-output");


export async function getSingleListingFromApi(id) {
    try {
        const response = await fetch(`${API_ALL_LISTINGS}/${id}?_bids=true&_seller=true`);
        const data = await response.json();
        const postsApi = data.data;
        listSingleListing(postsApi);
        console.log(postsApi);
        addEditDeleteButtons(postsApi);

        addListnerToBidButton()

        isSold(postsApi)

        

      
    } catch (error) {
        singleListingOutput.innerHTML = "";
        singleListingOutput.innerHTML = "<p>Kan ikke koble til serveren. Vennligst prøv igjen senere</p>";
        console.error(error.message);
    }
}

function getLastBid(bids) {
    if (!bids || bids.length === 0) {
        return 'Ingen bud'; 
    }
    return bids[bids.length - 1].amount; 
}

function isSold(api) {
    const endsAtDate = new Date(api.endsAt);
    const currentDate = new Date();
    if(currentDate > endsAtDate){
        const bidBtn = document.getElementById('bid-btn');
        bidBtn.classList.add("hidden");

        const soldText = document.createElement('p');
        soldText.textContent = 'Avsluttet';
        soldText.classList.add('text-red-500', 'text-lg', 'font-semibold', 'mb-4');
        
        // Sett inn <p>-taggen etter knappen
        bidBtn.parentNode.insertBefore(soldText, bidBtn.nextSibling);

        
    }

}


function listSingleListing(api) {
    const endsAtDate = new Date(api.endsAt);
    const hours = String(endsAtDate.getUTCHours()).padStart(2, '0');
    const minutes = String(endsAtDate.getUTCMinutes()).padStart(2, '0');
    const day = String(endsAtDate.getUTCDate()).padStart(2, '0');
    const month = String(endsAtDate.getUTCMonth() + 1).padStart(2, '0');
    const year = endsAtDate.getUTCFullYear();

    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${day}.${month}.${year}`;
    const bids = getLastBid(api.bids);
    singleListingOutput.innerHTML = "";

    singleListingOutput.innerHTML = `
        <div id="image-gallery" class=" relative overflow-hidden mb-4">
            <div id="slider" class="flex transition-transform duration-500 "></div>
            <button id="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#3C655D] text-white w-12 h-12 text-3xl rounded-full z-10 hover:bg-[#2E5149]"><</button>
            <button id="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#3C655D] text-white w-12 h-12 text-3xl rounded-full z-10 hover:bg-[#2E5149]">></button>
            <div id="slider-indicator" class="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-md text-sm font-bold shadow-md"></div>
        </div>
        <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold my-2">${api.title}</h1>
        <div class="space-x-4" id="h1-edit-delete-btn-cont"></div>
        </div>
        <div class="p-4 my-4 items-start space-y-2 bg-[#C9E9DA] rounded-lg shadow-lg">
            <div>
                <p class="text-[#3C655D] text-lg font-semibold">Bud</p>
                <p class="text-2xl font-bold text-[#000]">${bids}</p>
            </div>
            <p class="text-[#3C655D] text-lg font-semibold">Selger: 
                <span class="text-[#000] font-bold">${api.seller.name}</span>
            </p>
            <div>
                <p class="text-[#3C655D] text-lg font-semibold">Avslutter</p>
                <p class="text-[#000] font-medium text-lg">${formattedTime}</p>
                <p class="text-[#000] font-medium text-lg">${formattedDate}</p>
            </div>
        </div>
        <div id="bid-btn-cont">
        <button id="bid-btn" class="bg-[#3C655D] text-white py-2 px-6 my-8 rounded-lg font-medium hover:bg-[#2E5149] transition-colors mx-auto block">
            Gi bud
        </button></div>
        
        <p class="text-[#3C655D] text-lg font-semibold">Beskrivelse</p>
        <p class="text-[#000] text-lg leading-relaxed">${api.description}</p>
        <div id="toast-message" class="hidden fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
             Posten ble ikke slettet.
        </div>
    `;

    const gallery = document.getElementById('slider');
    const media = api.media;

    if (!media || media.length === 0) {
        const imgElement = document.createElement('img');
        imgElement.src = 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';
        imgElement.alt = 'placeholder image';
        imgElement.style.aspectRatio = '16/9';
        imgElement.className = ' w-full h-[300px] object-cover flex-shrink-0 lg:h-[500px]';
        

        gallery.appendChild(imgElement);
    } else {
        media.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.alt || 'Listing image';
            imgElement.onerror = function () {
                this.src = 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';
            };
            imgElement.style.aspectRatio = '16/9';
            imgElement.className = ' w-full h-[300px] object-cover flex-shrink-0  md:h-[500px]';
            gallery.appendChild(imgElement);
        });
    }

    // Slider functionality
    const images = document.querySelectorAll('#slider img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const indicator = document.getElementById('slider-indicator');
    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * 100;
        gallery.style.transform = `translateX(${offset}%)`;
        indicator.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function ifOneImage() {
        if (images.length === 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    ifOneImage();

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

   
    updateSlider();
}

function addEditDeleteButtons(api) {
    const username = localStorage.getItem('username');
    const container = document.getElementById('h1-edit-delete-btn-cont');

    if (api.seller.name === username) {
        const editButton = document.createElement('a');
        editButton.href = `/minside/redigerannonse/?id=${api.id}`;
        editButton.textContent = 'Rediger';
        editButton.className = 'text-[#3C655D] text-md md:text-lg font-medium hover:underline';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Slett';
        deleteButton.className = 'text-red-500 text-md md:text-lg font-medium hover:underline text-right';
        deleteButton.onclick = function() {
            const firstConfirmation = confirm("Er du sikker på at du vil slette denne posten?");
            if (firstConfirmation) {
                deleteListing();
            } else{
                showNotDeletedNotification()
                return;
            }



        };
        const bidBtn = document.getElementById('bid-btn');
        bidBtn.classList.add("hidden");

        container.appendChild(editButton);
        container.appendChild(deleteButton);
    }
}


async function deleteListing() {
    
    //console.log('Listing slettet');

    
        try {
            const options = {
              method: "delete",
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
                    "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json",
              },
            };
        
            const response = await fetch(`${API_ALL_LISTINGS}/${id}`, options);
       if (response.ok) {
    
          //console.log("Posten er slettet");
        window.location = "/minside/";
        
        
    
          
        } else {
           //console.log(response);
    
            console.error("Klarer ikke slette annonsen");

            showNotDeletedNotification()
          
            
            
          
        }
      } catch (error) {
        console.error(error.message);
        console.error("Klarer ikke slette annonsen");
        showNotDeletedNotification()
       
        
        
      }
    }


    function showNotDeletedNotification() {
        const toastMessage = document.getElementById("toast-message");
        toastMessage.classList.remove("hidden");
        setTimeout(() => {
            toastMessage.classList.add("hidden");
        }, 5000);
    }


    function addListnerToBidButton() {
        const bidBtn = document.getElementById('bid-btn');
            bidBtn.addEventListener("click", async () => {
                if(!localStorage.token){
                    window.location.href = '/login/'; 
                    return;
                }

               

                const myCredits = await getCreditAmount();
               // console.log(myCredits); 

                

                const creditsAvailable = document.createElement('h2');
                creditsAvailable.textContent = `Disponibel kreditt: ${myCredits}`;
                creditsAvailable.classList.add('text-black', 'text-lg', 'font-semibold', 'mb-4', 'text-center');

                const bidDiv = document.createElement('div');
                bidDiv.classList.add('w-96', 'bg-white', 'p-8', 'rounded-lg', 'shadow-lg', 'fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'z-100');
                
                const bidInput = document.createElement('input');
                bidInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-[#3C655D]', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-[#3C655D]', 'my-4');
        
                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Legg inn bud';
                submitBtn.classList.add('bg-[#3C655D]', 'text-white', 'py-2', 'px-6', 'rounded-lg', 'font-medium', 'hover:bg-[#2E5149]', 'transition-colors', 'mx-auto', 'block');

                const alertBidError = document.createElement('p');
                alertBidError.classList.add('text-red-500', 'text-sm', 'font-semibold', 'text-center', 'mb-4', 'hidden');

                const closeBtn = document.createElement('button');
                closeBtn.textContent = 'Avbryt';
                closeBtn.classList.add( 'text-red-500', 'py-2', 'px-6', 'rounded-lg', 'font-medium', 'hover:underline', 'transition-colors', 'mx-auto', 'block');

                bidDiv.appendChild(creditsAvailable);
                bidDiv.appendChild(bidInput);
                bidDiv.appendChild(alertBidError);
                bidDiv.appendChild(submitBtn);
                bidDiv.appendChild(closeBtn);
                
        
                document.body.appendChild(bidDiv);
        
            
                submitBtn.addEventListener('click', () => {
                    const bidValue = Number(bidInput.value);
                
                    console.log(bidValue);
                    if (bidValue > myCredits) {
                        alertBidError.textContent = 'Du har ikke nok kreditt til å legge inn dette budet';
                        alertBidError.classList.remove('hidden');
                        return;
                    } else{
                        putBidOnListing(bidValue , alertBidError);
                    }
        
                });

                closeBtn.addEventListener('click', () => {
                    bidDiv.remove();
                }   );
            });
    }

    export async function getCreditAmount() {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "X-Noroff-API-Key": API_KEY,
                    "Content-Type": "application/json",
                },
            };

           
        
    
            const response = await fetch(`${API_ALL_PROFILES}/${localStorage.username}`, options);
    
            if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    
            const data = await response.json();
            const api = data.data;
            //console.log(api.credits);
            return api.credits;
        } catch (error) {
            console.error("Error message: " + error);
            
    
        }
    }


    async function putBidOnListing(bid, alert) {
        try {
            const options = {
              method: "post",
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
                    "X-Noroff-API-Key": API_KEY,
                    "Content-Type": "application/json",
                    
              },
              body: JSON.stringify(
               { amount: bid,}
                
              ),
            };
       
            const response = await fetch(`${API_ALL_LISTINGS}/${id}/bids`, options);
    
    
       if (response.ok) {
    
          console.log("bid posted");
            location.reload();
    
          
        } else {
            //console.log(response);
            const errorData = await response.json();
            console.log(errorData.errors[0].message)
            if(errorData.errors[0].message == "Your bid must be higher than the current bid"){
                alert.textContent = 'Budet ditt må være høyere enn det nåværende budet';
                alert.classList.remove('hidden');
                return;
            } else{
                alert.textContent = 'Ikke mulig å legge inn bud';
                alert.classList.remove('hidden');
                return;
            }
    
           
            
            
          
        }
      } catch (error) {
        console.error(error.message);
        console.error("Failed to bid on listing");
        alert.textContent = 'Ikke mulig å legge inn bud';
        alert.classList.remove('hidden');
        return
        
        
      }
    }
    

    

 