import {getAllListingsFromApi} from "/src/js/api/home";
import {getSearchedListingsFromApi} from "/src/js/api/home";

let page = 1;
const currentPage = document.getElementById("current-page");

currentPage.innerText = page;


getAllListingsFromApi(page);
checkIfPageIsOne()

function checkIfPageIsOne(){
    if(page < 2){
        forrige.disabled = true;
        forrige.classList.add("bg-[#D3E5DF]");
        forrige.classList.add("hover:bg-[#D3E5DF]");
       
    } else{
        forrige.disabled = false;
        forrige.classList.remove("bg-[#D3E5DF]");
        forrige.classList.remove("hover:bg-[#D3E5DF]");}
        
    }

document.getElementById('neste').addEventListener('click', () => {
    page += 1;
    getAllListingsFromApi(page);
    checkIfPageIsOne()

    currentPage.innerText = "";
    currentPage.innerText = page;

    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
});

document.getElementById('forrige').addEventListener('click', () => {
    page -= 1;
    getAllListingsFromApi(page);
    checkIfPageIsOne()

    currentPage.innerText = "";
    currentPage.innerText = page;

    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    page = 1;
    currentPage.innerText = "";
    currentPage.innerText = page;
    checkIfPageIsOne()
    
    const query = searchInput.value.trim();
    console.log(query);
  

    if (query.length > 0) {
        getSearchedListingsFromApi(query, page);
    } else {
        getAllListingsFromApi(page);
    }
});