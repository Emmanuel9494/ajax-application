(() => {
  // Variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector(".loader");
  const noMaterials = document.querySelector("#main-materials");
  const errorMessageElement = document.createElement("p");
  errorMessageElement.classList.add("error-message");
  errorMessageElement.textContent = "Unable to load data. Please check your internet connection and try again.";


  // Load InfoBoxes
  function loadInfoBoxes() {
    // There are two dots in the https address, kindly remove one dot, to see fetched data.
    // There are two dots in the https address, kindly remove one dot, to see fetched data.
    fetch("https://swiftpixel..com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          const pictureElement = document.createElement("img");
          pictureElement.src = `images/${infoBox.thumbnail}`;
          pictureElement.alt = infoBox.heading;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          selected.appendChild(pictureElement);
        });
      })
      .catch((error) => {
        console.log(error);
        hotspots.forEach((hotspot) => {
          const errorMessage = errorMessageElement.cloneNode(true);
          const loaderClone = loader.cloneNode(true);
          
          // Show the error and loader message when hover happens
          hotspot.addEventListener("mouseenter", () => {
            hotspot.appendChild(errorMessage);
            hotspot.appendChild(loaderClone);
          });

          // Hide the error and loader message when mouse leaves
          hotspot.addEventListener("mouseleave", () => {
            hotspot.removeChild(errorMessage);
            hotspot.removeChild(loaderClone);
          });
        });
      });
  }

  // Load Materials
  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materials) => {
        materials.forEach((material) => {
          // Clone the template
          const clone = materialTemplate.content.cloneNode(true);

          // Populate with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        loader.classList.toggle("hidden");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Unable to load materials. Please check your internet connection and try again.";
        noMaterials.appendChild(errorMessage);
      });
  }

  loadMaterialInfo();
  loadInfoBoxes();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
