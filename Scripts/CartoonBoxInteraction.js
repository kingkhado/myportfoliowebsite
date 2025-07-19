document.addEventListener("DOMContentLoaded", function() {
    const cartoonBoxClass = 'cartoonBox';
    const cartoonBoxes = document.getElementsByClassName(cartoonBoxClass);

    for (let i = 0; i < cartoonBoxes.length; i++) {
        cartoonBoxes[i].addEventListener("click", clickedOnCartoonBox);
    }

    function clickedOnCartoonBox(event) {
        const clickedCartoonBox = event.currentTarget;
        const url = clickedCartoonBox.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    }
});
