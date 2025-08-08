
// fetching header from header.html 
fetch('navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    initHeaderScripts()
    // script for dropdown header  

    const dropdownMenu = document.getElementById("dropdown-menu")



    const navbarSearchMobileView = document.getElementById("navbar-search__mobile-view")
    const categoryListMobileView = document.querySelectorAll(".category-list__mobile-view")

    categoryListMobileView.forEach(cl => {
      cl.addEventListener("click", () => {
        const liststext = cl.textContent
        navbarSearchMobileView.value = liststext
        console.log(navbarSearchMobileView.value)
      });
    })

    const searchInput = document.getElementById("input__search-form")
    const searchbtn = document.getElementById("search-form__btn")
    const navbarSearchFormBtn = document.getElementById("navbar-search-form__btn")
    const dummyWrapper = document.querySelector(".dummy-wrapper");
    const resultWrapper = document.querySelector(".result-wrapper");





    searchbtn.addEventListener("click", handleClick);
    navbarSearchFormBtn.addEventListener("click", handleClick);

    function handleClick(e) {
      e.preventDefault()
      dropdownMenu.classList.remove("show");
      let input = searchInput.value.trim()
      let navbarsearchinput = navbarSearchMobileView.value.trim()
      // we use this  if/else so that it clear the memory. 
      // without this the mobile view do not search again the different category after you come back from desktop view again due to previous search in memory
      if (e.target.id === "search-form__btn") {
        navbarSearchMobileView.value = "";
        navbarsearchinput = "";
      } else if (e.target.id === "navbar-search-form__btn") {
        searchInput.value = "";
        input = "";
      }
      const category = input || navbarsearchinput;
      if (!category) {
        console.log("search field cannot be empty")
        dummyWrapper.style.display = "flex";
        resultWrapper.style.display = "none";
        return
      }

      else {
        dummyWrapper.style.display = "none";
        resultWrapper.style.display = "flex";

        const showdata = async () => {
          try {
            console.log("fetching data...")
            const response = await fetch(`https://dummyjson.com/products/category/${category}`)
            // const response = await fetch(`https://dummyjson.com/products/category/search?q=${input}`)
            const result = await response.json()
            console.log(result)
            resultWrapper.innerHTML = "";
            result.products.forEach(prd => {
              let item = document.createElement("div")
              resultWrapper.appendChild(item)
              item.classList.add("item")
              item.innerHTML = `
          <img src="${prd.thumbnail}" alt="${prd.title}">
          <div class="item-desc">
          <p>${prd.title}</p>
          <span class="discount">${prd.discountPercentage}%</span>
          </div>
          `;
            });
          } catch (error) {
            console.log("error", error)
          }

        }

        showdata()
        // navbarsearchinput = "";
      }
    }
    // )
  });



