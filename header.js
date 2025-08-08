
function initHeaderScripts() {
    const searchInput = document.getElementById("input__search-form")
    const dropdownIcon = document.getElementById("drop-down-icon")

    const mensDropDownLI = document.getElementById("mens-dropdown")

    const womensDropDownIcon = document.getElementById("womens-dropdown")
    const womensDropdownMenu = document.getElementById("womens-extend-menu")
    const categoryList = document.querySelectorAll(".category-list")
    const mensDropdownMenu = document.getElementById("mens-extend-menu")
    const dropdownMenu = document.getElementById("dropdown-menu")


    // script for dropdown header  
    dropdownIcon.addEventListener("click", () => {
        dropdownMenu.classList.add("show")
        console.log("click")

    })
    document.addEventListener("click", (e) => {
        if (
            dropdownMenu.classList.contains('show') && // the menu is open
            !dropdownIcon.contains(e.target) &&             // the click is NOT on the menu icon
            !dropdownMenu.contains(e.target)           // the click is NOT inside the menu
        ) {
            dropdownMenu.classList.remove('show');     // then close it
        }
    })
    mensDropDownLI.addEventListener("mouseenter", () => {
        mensDropdownMenu.classList.add("show")
        womensDropdownMenu.classList.remove("show")
    })
    mensDropdownMenu.addEventListener("mouseleave", () => {
        // change toggle to remove 
        mensDropdownMenu.classList.remove("show")
    })


    womensDropDownIcon.addEventListener("mouseenter", () => {
        womensDropdownMenu.classList.add("show")
        mensDropdownMenu.classList.remove("show")

    })
    womensDropdownMenu.addEventListener("mouseleave", () => {
        womensDropdownMenu.classList.remove("show")
    })

    // script for select product and show on searchfield


    categoryList.forEach(cl => {
        cl.addEventListener("click", () => {
            const liststext = cl.textContent
            searchInput.value = liststext
        });
    })



    // for mobile vew 

    const mensMobileViewDropDownLI = document.getElementById("mens-dropdown__mobile-view")

    const womensDropDownIconMobileView = document.getElementById("womens-dropdown__mobile-view")
    const womensDropdownMenuMobileView = document.getElementById("womens-extend-menu__mobile-view")
    const mensDropdownMenuMobileView = document.getElementById("mens-extend-menu__mobile-view")
    const dropdownMenuMobileView = document.getElementById("dropdown-menu__mobile-view")
    const menuBarMobileView = document.getElementById("menubar__mobile-view")





    menuBarMobileView.addEventListener("click", () => {
        dropdownMenuMobileView.classList.toggle("show")
    })
    mensMobileViewDropDownLI.addEventListener("mouseenter", () => {
        mensDropdownMenuMobileView.classList.add("show")
        womensDropdownMenuMobileView.classList.remove("show")
    })
    mensDropdownMenuMobileView.addEventListener("mouseleave", () => {
        
        mensDropdownMenuMobileView.classList.remove("show")
    })

    womensDropDownIconMobileView.addEventListener("mouseenter", () => {
        womensDropdownMenuMobileView.classList.add("show")
        mensDropdownMenuMobileView.classList.remove("show")

    })
    womensDropdownMenuMobileView.addEventListener("mouseleave", () => {
        womensDropdownMenuMobileView.classList.remove("show")
    })
    document.addEventListener('click', (e) => {
        // If the menu is open and the click is outside the menu
        if (
            dropdownMenuMobileView.classList.contains('show') && // the menu is open
            !menuBarMobileView.contains(e.target) &&             // the click is NOT on the menu icon
            !dropdownMenuMobileView.contains(e.target)           // the click is NOT inside the menu
        ) {
            dropdownMenuMobileView.classList.remove('show');     // then close it
        }
    });

}