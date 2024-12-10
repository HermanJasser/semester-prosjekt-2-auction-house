export function createHeader() {
  console.log("hei"); 
    const headerHTML = `

    <header class="bg-[#f6fffa]">
      <div
        class="flex justify-between items-center px-10 md:px-20 py-8 mx-auto max-w-7xl"
      >
       
        <a href="/" class="hidden md:block">
          <img
            src="/images/logo-full.svg"
            alt="logo-full"
            class="w-64 h-auto"
          />
        </a>
    
  
        <a href="/" class="block md:hidden">
          <img
            src="/images/logo-simpel.svg"
            alt="logo-simpel"
            class="w-14 h-auto"
          />
        </a>
        
        <div id="min-side-btn">
        </div>
      </div>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  