const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');
const wheelButtonSection = document.getElementById('wheel-buttons');
const performanceBtn = document.getElementById('performance-btn');
const totalPriceElement = document.getElementById('total-price');
const fullSelfDrivingCheckbox = document.getElementById('full-self-driving-checkbox');
const accessoriesCheckboxes = document.querySelectorAll('.accessory-form-checkbox');
const downPaymentElement = document.getElementById('down-payment');
const monthlyPaymentElement = document.getElementById('monthly-payment');

const basePrice = 52490;
let currentPrice = basePrice;

// Selected Color
let selectedColor = "Stealth Grey";
const selectedOptions = {
  "Performance Wheels" : false,
  "Performance Package" : false,
  "Full Self-Driving" : false,
}


// Update Total Price
const pricing = {
  "Performance Wheels" : 2500,
  "Performance Package" : 5000,
  "Full Self-Driving" : 8500,
  "Accessories" : {
    "Center Console Trays" : 35,
    "Sunshade" : 105,
    "All-Weather Interior Liners" : 225
  },
}

const updateTotalPrice = () => {
  // Reset Total Price
  currentPrice = basePrice;
  if (selectedOptions['Performance Wheels']) {
    currentPrice += pricing['Performance Wheels'];
  }
  if (selectedOptions['Performance Package']) {
    currentPrice += pricing['Performance Package'];
  }
  if (selectedOptions['Full Self-Driving']) {
    currentPrice += pricing['Full Self-Driving'];
  }
  // Add Accessories
  accessoriesCheckboxes.forEach((checkbox) => {
   const accessoryLabel = checkbox.closest('label').querySelector('span').textContent.trim();
   const accessoryPrice = pricing['Accessories'][accessoryLabel];
   if (checkbox.checked) {
     currentPrice += accessoryPrice;
   }
   
  });
 
  // Update Total Price
  totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;

  // Update Payment Breakdown
  updatePaymentBreakdown();

}


// Update Down Payment On Current Price
const updatePaymentBreakdown = () => {
  const downPayment = currentPrice * 0.1;
  downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;
  // Calculate Loan (60 months at 3% APR)
  const loanTermMonths = 60;
  const interestRate = 0.03;
  const loanAmount = currentPrice - downPayment;
  // Calculate Monthly Payment 
  const monthlyInterestRate = interestRate / 12;
  const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;
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
    updateTotalPrice();
   }
  }


// Handle Performance Upgrade
const handlePerformanceButtonClick = () => {
  const isSelected = performanceBtn.classList.toggle('bg-gray-700');
  performanceBtn.classList.toggle('text-white');
  // Update selected options
  selectedOptions['Performance Package'] = isSelected;
  updateTotalPrice();
};

// Handle Full Self-Driving
const fullSelfDrivingChange = () => {
  const isSelected = fullSelfDrivingCheckbox.checked;
  selectedOptions['Full Self-Driving'] = isSelected;
  updateTotalPrice();
  };
  
// Handle Accessories
accessoriesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => updateTotalPrice()); 
});


// Initial Update Total Price
updateTotalPrice();

// Add event listener
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange);
