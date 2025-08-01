
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
        if (!dropdownMenu.contains(e.target) && !dropdownIcon.contains(e.target)) {
            dropdownMenu.classList.remove("show");
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





}