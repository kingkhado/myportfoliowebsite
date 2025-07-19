//My Blog Buttons

//onclick on to achieve the data target attribute from the button and changes the page
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("button[data-target]").forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = button.getAttribute("data-target");
        });
    });
});