const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');
const wheelButtonSection = document.getElementById('wheel-buttons');
const performanceBtn = document.getElementById('performance-btn');

// Selected Color
let selectedColor = "Stealth Grey";
const selectedOptions = {
  "Performance Wheels" : false,
  "Performance Package" : false,
  "Full Self-Driving" : false,
}

// Handle scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Handle Image Selection
const exteriorImages = {
  'Stealth Grey': '../images/model-y-stealth-grey.jpg',
  'Pearl White': '../images/model-y-pearl-white.jpg',
  'Deep Blue': '../images/model-y-deep-blue-metallic.jpg',
  'Solid Black': '../images/model-y-solid-black.jpg',
  'Ultra Red': '../images/model-y-ultra-red.jpg',
  Quicksilver: '../images/model-y-quicksilver.jpg',
};

const interiorImages = {
  Dark: '../images/model-y-interior-dark.jpg',
  Light: '../images/model-y-interior-light.jpg',
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
      selectedColor = button.querySelector("img").alt;
      updateExteriorImage();
      
    }
    // Change Interior Image
    if (event.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color]; 
    }
  };
};

// Update Exterior Image based on color and performance wheels
const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions['Performance Wheels']
    ? '-performance'
    : '';
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
  exteriorImage.src = exteriorImages[colorKey].replace(
    '.jpg',
    `${performanceSuffix}.jpg`
  );
};


// Wheel Selection
const handleWheelButtonClick = (event) => {
  if (event.target.tagName === 'BUTTON') {
    const buttons = document.querySelectorAll('#wheel-buttons button');
    buttons.forEach((btn) => btn.classList.remove('bg-gray-700', 'text-white'));

    // Add selected styles to clicked button
    event.target.classList.add('bg-gray-700', 'text-white');

    selectedOptions['Performance Wheels'] =
      event.target.textContent.includes('Performance');

    updateExteriorImage();
   }
  }


// Handle Performance Upgrade
const handlePerformanceButtonClick = () => {
  const isSelected = performanceBtn.classList.toggle('bg-gray-700');
  performanceBtn.classList.toggle('text-white');}

// Add event listener
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
