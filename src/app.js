/*import "./css/style.css";

import router from "./js/router";




await router(window.location.pathname);

import { createHeader } from '/src/js/ui/header.js';
import { createFooter } from '/src/js/ui/footer.js';
import { myPageBtnIfLoggedIn } from '/src/js/ui/isLoggedIn.js';
import { isLoggedOut } from '/src/js/ui/isLoggedIn.js';

console.log("hei");

createHeader();
myPageBtnIfLoggedIn()
createFooter();

isLoggedOut()*/

import "./css/style.css";

import router from "./js/router";

import { createHeader } from "./js/ui/header.js";
import { createFooter } from "./js/ui/footer.js";
import { myPageBtnIfLoggedIn } from "./js/ui/isLoggedIn.js";
import { isLoggedOut } from "./js/ui/isLoggedIn.js";



async function initializeApp() {
  await router(window.location.pathname);

  createHeader();
  myPageBtnIfLoggedIn();
  createFooter();
  isLoggedOut();
}

initializeApp();
