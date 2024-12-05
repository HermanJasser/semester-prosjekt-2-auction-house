import { getMyProfile, getMyListings } from "/src/js/api/myPage";
import {onLogout} from "/src/js/ui/LogOutBtn";


getMyProfile() ;
getMyListings();

const logoutBtn = document.getElementById("log-out-btn");
logoutBtn.addEventListener("click", onLogout);