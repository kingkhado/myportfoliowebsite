function animateText() {
    const text = document.getElementById('animated-text');
    const originalText = text.textContent;
    text.textContent = '';
  
    let index = 0;
  
    function addLetter() {
      if (index < originalText.length) {
        text.textContent += originalText.charAt(index);
        index++;
        setTimeout(addLetter, 100); 
      }
    }
  
    addLetter();
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    animateText();
  });