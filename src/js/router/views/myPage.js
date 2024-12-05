import { getMyProfile } from "/src/js/api/myPage";
import {onLogout} from "/src/js/ui/LogOutBtn";


getMyProfile() ;

const logoutBtn = document.getElementById("log-out-btn");
logoutBtn.addEventListener("click", onLogout);