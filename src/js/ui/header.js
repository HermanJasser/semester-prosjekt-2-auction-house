export function createHeader() {
    const headerHTML = `
    <header class="bg-[#f6fffa]">
      <div
        class="flex justify-between items-center px-10 md:px-20 py-8 mx-auto max-w-7xl"
      >
       
        <a href="/" class="hidden md:block">
          <img
            src="./public/img/logo-full.svg"
            alt="logo-full"
            class="w-64 h-auto"
          />
        </a>
    
  
        <a href="/" class="block md:hidden">
          <img
            src="./public/img/logo-simpel.svg"
            alt="logo-simpel"
            class="w-14 h-auto"
          />
        </a>
        
        <a
          href="./minside/"
          class="text-[#3c655d] text-xl md:text-2xl font-medium hover:underline"
        >
          Min side
        </a>
      </div>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  