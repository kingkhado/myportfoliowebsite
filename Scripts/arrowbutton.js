// Arrow Buttons for Navigation

document.addEventListener("DOMContentLoaded", function() {
 
    document.querySelectorAll(".arrow-button").forEach(function(button) {
     
        button.addEventListener("click", function() {
       
            var target = button.getAttribute("data-target");
            
          
            if (target) {
               
                window.location.href = target;
            } else {
                console.error("Arrow button does not have a valid data-target attribute.");
            }
        });
    });
});
