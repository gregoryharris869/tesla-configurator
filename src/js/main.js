const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');

// Handle scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Handle Color Selection

// Add event listener
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll))