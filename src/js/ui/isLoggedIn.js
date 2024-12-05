export function redirectIfLoggedIn() {
    if (localStorage.token) {
        location.href = "/";
    }
  }

  

  export function myPageBtnIfLoggedIn() {

    const minSideBtn = document.getElementById("min-side-btn")

    if (localStorage.token) {

        minSideBtn.innerHTML = "";
        minSideBtn.innerHTML = `<a
        href="/minside/"
        class="text-[#3c655d] text-xl md:text-2xl font-medium hover:underline"
      >
        Min side
      </a>`
    } else if(window.location.pathname === "/login/" || window.location.pathname === "/register/") {
        minSideBtn.innerHTML = "";
    } else {
        minSideBtn.innerHTML = "";
        minSideBtn.innerHTML = `<a
          href="/login/"
          class="text-[#3c655d] text-xl md:text-2xl font-medium hover:underline"
        >
          Logg inn
        </a>`
    }
  }