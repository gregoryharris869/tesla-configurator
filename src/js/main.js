const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');
const wheelButtonSection = document.getElementById('wheel-buttons');

// Handle scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Handle Image Selection
const exteriorImages = {
  "Stealth Grey": "src/images/modelystealthgrey.jpg",
  "Pearl White": "src/images/modelypearlwhite.jpg",
  "Deep Blue": "src/images/modelydeepbluemetallic.jpg",
  "Solid Black": "src/images/modelysolidblack.jpg",
  "Ultra Red": "src/images/modelyultrared.jpg",
  "Quicksilver": "src/images/modelyquicksilver.jpg",
};

const interiorImages = {
  Dark: "src/images/modelyinteriordark.jpg",
  Light: "src/images/modelyinteriorlight.jpg",
};


// Handle Color Selection
const handleColorButtonClick = (event) => {
  let button;
  if(event.target.tagName === "IMG") { 
    button = event.target.closest("button");
  } else if (event.target.tagName === "BUTTON") {
    button = event.target;
  };

  if (button) {
    const buttons = event.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    button.classList.add("btn-selected");
    // Change Exterior Image
    if (event.currentTarget === exteriorColorSection) {
      const color = button.querySelector("img").alt;
      exteriorImage.src = exteriorImages[color];
      
    }
    // Change Interior Image
    if (event.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color]; 
    }
  };
};

// Wheel Selection
const handleWheelButtonClick = (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-buttons button");
    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));
    // Add selected styles clicked button
    event.target.classList.add("bg-gray-700", "text-white");
    // Selected Wheel
    const selectedWheel = event.target.textContent.includes("Performance");
    exteriorImage.src = selectedWheel ? "src/images/modelystealthgreyperformance.jpg" : "src/images/modelystealthgrey.jpg";
  }
  
}

// Add event listener
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonSection.addEventListener('click', handleWheelButtonClick);
