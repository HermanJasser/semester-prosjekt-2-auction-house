import "./css/style.css";

import router from "./js/router";

console.log("hei");


await router(window.location.pathname);

import { createHeader } from '/src/js/ui/header.js';
import { createFooter } from '/src/js/ui/footer.js';
import { myPageBtnIfLoggedIn } from '/src/js/ui/isLoggedIn.js';
import { isLoggedOut } from '/src/js/ui/isLoggedIn.js';



createHeader();
myPageBtnIfLoggedIn()
createFooter();

isLoggedOut()