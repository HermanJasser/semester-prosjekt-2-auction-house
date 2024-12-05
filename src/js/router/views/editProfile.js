import { getMyProfileEdit, updateProfile } from "/src/js/api/editProfile";




getMyProfileEdit();

const editProfileBtn = document.getElementById("edit-profile-btn");
const urlProfilImg = document.getElementById("urlProfilImg");

editProfileBtn.addEventListener("click", updateProfile);