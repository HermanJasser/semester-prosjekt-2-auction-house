import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

import { createHeader } from './js/ui/header.js';
import { createFooter } from './js/ui/footer.js';
import { myPageBtnIfLoggedIn } from './js/ui/isLoggedIn.js';

createHeader();
myPageBtnIfLoggedIn()
createFooter();