export function createFooter() {
    const footerHTML = `
      <footer class="mt-[100px] bg-[#C9E9DA]">
        <div
          class="flex justify-between items-center px-10 md:px-20 py-8 mx-auto max-w-7xl"
        >
          <!-- Logo -->
          <a href="/" class="hidden md:block">
            <img
              src="/images/logo-full.svg"
              alt="logo-full"
              class="w-64 h-auto"
            />
          </a>
          
          <!-- Mobilvennlig logo -->
          <a href="/" class="block md:hidden">
            <img
              src="/images/logo-simpel.svg"
              alt="logo-simpel"
              class="w-14 h-auto"
            />
          </a>
          
          <!-- Ekstra footer-innhold -->
          <p class="text-gray-600 text-sm md:text-base">
            &copy; 2024 Markedet. Alle rettigheter forbeholdt.
          </p>
        </div>
      </footer>
    `;
  
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  