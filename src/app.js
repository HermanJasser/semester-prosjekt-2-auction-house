import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

import { createHeader } from './js/ui/header.js';

createHeader();