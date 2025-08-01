
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

    // const dropdownIcon = document.getElementById("drop-down-icon")
    const dropdownMenu = document.getElementById("dropdown-menu")
    // dropdownIcon.addEventListener("click", () => {
    //   dropdownMenu.classList.toggle("show")
    //   console.log("click")

    // })

    // const mensDropDownLI = document.getElementById("mens-dropdown")
    // const mensDropdownMenu = document.getElementById("mens-extend-menu")
    // mensDropDownLI.addEventListener("mouseenter", () => {
    //   mensDropdownMenu.classList.add("show")
    //   womensDropdownMenu.classList.remove("show")
    // })
    // mensDropdownMenu.addEventListener("mouseleave", () => {
    //   mensDropdownMenu.classList.toggle("show")
    // })


    // const womensDropDownIcon = document.getElementById("womens-dropdown")
    // const womensDropdownMenu = document.getElementById("womens-extend-menu")

    // womensDropDownIcon.addEventListener("mouseenter", () => {
    //   womensDropdownMenu.classList.add("show")
    //   mensDropdownMenu.classList.remove("show")

    // })
    // womensDropdownMenu.addEventListener("mouseleave", () => {
    //   womensDropdownMenu.classList.remove("show")
    // })

    // // script for select product and show on searchfield

    // const categoryList = document.querySelectorAll(".category-list")

    // categoryList.forEach(cl => {
    //     cl.addEventListener("click", () => {
    //     const liststext = cl.textContent
    //     searchInput.value = liststext
    //   });
    // })

    // 



    const searchInput = document.getElementById("input__search-form")
    const searchbtn = document.getElementById("search-form__btn")
    const dummyWrapper = document.querySelector(".dummy-wrapper");
    const resultWrapper = document.querySelector(".result-wrapper");

    searchbtn.addEventListener("click", (e) => {
      e.preventDefault()
      dropdownMenu.classList.remove("show");
      let input = searchInput.value.trim()
      if (!input) {
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
            const response = await fetch(`https://dummyjson.com/products/category/${input}`)
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
      }
    })
  });



