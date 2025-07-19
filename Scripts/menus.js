const root = "/WSOA3028A_2549471"

const menuItems = [
    {name: "Home", href: root + "/index.html"},
    {name: "Blogs", href: `${root}/Blogpost/blogpost.html`},
    {name: "Essays", href: `${root}/essay/essay.html`},
    {name: "Portfolio", href: `${root}/portfolio/portfolio.html`},
    {name: "Design", href: `${root}/designs/design.html`},
    {name: "About", href: `${root}/about/about.html`},

    
];
export function initialise(currentPage){                   

    console.log("worked")
    const nav = document.querySelector("header > nav")      //this will make sure the nav element is selcected within each html document
    const ul = document.createElement("ul")
    for(let menuItem of menuItems)                          //iterates over each menu item in menuItems array
    {
        const li = document.createElement("li")              //Within each iteration a list element is made for each item
        if(currentPage != menuItem.name)                     //Condition to check if currentPage name does not match menu item name
        {
            const a = document.createElement("a")            // if its true, an anchor element is made for each menu item
            a.innerText = menuItem.name                     // sets the text content of anchor to the menu item name
            a.setAttribute("href", menuItem.href)           // sets the href attribute to the corresponding to URL
            li.appendChild(a)

        }
        else{
            li.innerText = menuItem.name
        }
        ul.appendChild(li)
    }
    nav.appendChild(ul)

    
}