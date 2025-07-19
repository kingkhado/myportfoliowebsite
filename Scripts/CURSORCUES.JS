// Get the cursor icon element
const cursorIcon = document.querySelector('.cursor-icon');

// Get the mouse coordinates
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Update the cursor icon position
  cursorIcon.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
});

// Add event listeners for hover and click events
document.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('hoverable')) {
    cursorIcon.classList.add('hover');
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('hoverable')) {
    cursorIcon.classList.remove('hover');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('clickable')) {
    cursorIcon.classList.add('click');
  }
});

// Remove the click class after a short delay
setTimeout(() => {
  cursorIcon.classList.remove('click');
}, 200);