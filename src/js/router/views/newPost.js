



    const addImageBtn = document.getElementById("add-image-btn");
    const imgInputCont = document.getElementById("img-input-cont");
    const imgInputError = document.getElementById("img-input-error");
  
    addImageBtn.addEventListener("click", async () => {
      const lastImageInput = imgInputCont.querySelector("input:last-of-type");
      const url = lastImageInput.value;
  
      if (await isValidImageUrl(url)) {
        const newImageInput = document.createElement("input");
        newImageInput.type = "text";
        newImageInput.name = `img${imgInputCont.querySelectorAll("input").length + 1}`;
        newImageInput.title = "Legg inn URL-en til bildet du ønsker";
        newImageInput.className = "w-full px-4 py-2 border border-[#3C655D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C655D] mt-4";
  
        imgInputCont.appendChild(newImageInput);
        imgInputError.innerText = "";
      } else {
        imgInputError.innerText = "Bilde URL må være en gyldig URL";
      }
    });
  
    function isValidImageUrl(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }
