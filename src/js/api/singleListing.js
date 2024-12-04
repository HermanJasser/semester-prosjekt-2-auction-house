import { API_ALL_LISTINGS } from "../ui/constants";
const singleListingOutput = document.getElementById("single-listing-output");


export async function getSingleListingFromApi(id) {
    try {
        const response = await fetch(`${API_ALL_LISTINGS}/${id}?_bids=true&_seller=true`);
        const data = await response.json();
        const postsApi = data.data;
        listSingleListing(postsApi);

      
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
        <div id="image-gallery" class="relative overflow-hidden mb-4">
            <div id="slider" class="flex transition-transform duration-500"></div>
            <button id="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#3C655D] text-white w-12 h-12 text-3xl rounded-full z-10 hover:bg-[#2E5149]"><</button>
            <button id="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#3C655D] text-white w-12 h-12 text-3xl rounded-full z-10 hover:bg-[#2E5149]">></button>
            <div id="slider-indicator" class="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-md text-sm font-bold shadow-md"></div>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold my-2 mb-8">${api.title}</h1>
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
        <button class="bg-[#3C655D] text-white py-2 px-6 my-8 rounded-lg font-medium hover:bg-[#2E5149] transition-colors mx-auto block">
            Gi bud
        </button>
        <p class="text-[#3C655D] text-lg font-semibold">Beskrivelse</p>
        <p class="text-[#000] text-lg leading-relaxed">${api.description}</p>
    `;

    const gallery = document.getElementById('slider');
    const media = api.media;

    if (!media || media.length === 0) {
        const imgElement = document.createElement('img');
        imgElement.src = 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';
        imgElement.alt = 'placeholder image';
        imgElement.className = 'w-full h-[400px] object-cover flex-shrink-0 md:h-[600px] lg:h-[700px]';
        gallery.appendChild(imgElement);
    } else {
        media.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.alt || 'Listing image';
            imgElement.onerror = function () {
                this.src = 'https://raw.githubusercontent.com/HermanJasser/folder-for-images/3fed7422fa0abc67ac78fbedf6bf1c87f61b47ea/img/Placeholder-_-Glossary.svg';
            };
            imgElement.className = 'w-full h-[400px] object-cover flex-shrink-0 md:h-[600px] lg:h-[700px]';
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

    // Initialize slider
    updateSlider();
}
