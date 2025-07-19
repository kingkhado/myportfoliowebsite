const blogTexts = document.getElementsByClassName("changableText");
const toTexts = ["Imagining the Internet","Interaction and the www","Interaction Design for the Web","The IxD Process / Headers and Microformats","RSA Website","The Ethics of UI & UX Practice","Internet, Society and Design Justice"," The World in www","Digital Inequalities","Digital Coloniality","Decolonising Technology","Ethical Internet","Hear me Out"];
const backTexts = ["Blog Post 1 ","Blog Post 2","Blog Post 3","Blog Post 4","Blog Post 5","Blog Post 6","Blog Post 8","Blog Post 9","Blog Post 10","Blog Post 11","Blog Post 12","Blog Post 13","Additonal Reflection"];


for(let i= 0; i < blogTexts.length; i++){
    blogTexts[i].setAttribute('data-index', i);
    blogTexts[i].addEventListener("mouseover", changeText);
    blogTexts[i].addEventListener("mouseleave", revertText);
}

function changeText(event) {
    const blogBox = event.currentTarget;
    const index = blogBox.getAttribute('data-index');
    blogBox.textContent = toTexts[index];    
}

function revertText(event){
    const blogBox = event.currentTarget;
    const index = blogBox.getAttribute('data-index');
    blogBox.textContent = backTexts[index];
}