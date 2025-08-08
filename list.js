// Fetch header, footer, navbar
fetch('navbar.html')
  .then(res => res.text())
  .then(data => document.getElementById("navbar").innerHTML = data);

fetch('footer.html')
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    initHeaderScripts(); // if you need your header scripts

    // Elements
    const inputSearchField = document.getElementById("input__search-form");
    const searchBtn = document.getElementById("search-form__btn");
    const mainList = document.getElementById("main__list");
    const itemCountItem = document.querySelector(".item-count__text");
    const gridView = document.getElementById("grid-view");
    const listView = document.getElementById("list-view");
    const viewChange = document.querySelector(".content__view-change");

    let currentView = "grid"; // default

    // Sidebar Menu Toggle
    document.querySelectorAll(".menu-contract").forEach(MenuIcon => {
      MenuIcon.addEventListener("click", () => {
        const menu = MenuIcon.closest("div").nextElementSibling;
        menu.classList.toggle("show");
      });
    });
    // mobile view show search field 
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


 const dropdownMenu = document.getElementById("dropdown-menu")

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
        alert("Enter a category like 'smartphones' or 'laptops'");
        return;
      }
      fetchProducts(category);
    };

// Fetch products by category
async function fetchProducts(category) {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const result = await response.json();
    console.log(result);

    if (result.products && result.products.length > 0) {
      displayProducts(result.products);
      itemCountItem.innerHTML = `${result.products.length} items in <b class="bold">${category}</b>`;
    } else {
      alert("No products found! Showing default dummy items.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display products in current view
function displayProducts(products) {
  mainList.innerHTML = "";

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = currentView === "grid" ? "list__item" : "list__item__row-view";

    item.innerHTML = `
          <div class="${currentView === "grid" ? "item-img" : "row__item-img"}">
            <img src="${product.thumbnail}" alt="${product.title}">
          </div>
          <div class="item-info">
            <div class="item-info-left">
              <div class="item__price-info">
                <h1 class="item-price">$${product.price}</h1>
                <h1 class="item-discount">$${(product.price * 1.2).toFixed(2)}</h1>
              </div>
              <div class="item-review">
                ${'<i class="fa-regular fa-star"></i>'.repeat(5)}
              </div>
              <div class="item-desc">
                <a class="item-desc-link" href="itemdetail.html?id=${product.id}">
                  <h1 class="item-desctext">${product.title}</h1>
                </a>
                <h1 class="row__item-detail" style="display:${currentView === "list" ? "block" : "none"}">
                  ${product.description}
                </h1>
                <a class="view__detail-link" href="itemdetail.html?id=${product.id}">
                  <h1 class="row__item-view-detail" style="display:${currentView === "grid" ? "flex" : "block"}">
                    View details
                  </h1>
                </a>
              </div>
            </div>
            <div class="item-favourate">
              <i class="fa-regular fa-heart"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        `;

    mainList.appendChild(item);
  });
}

// Grid/List Toggle
viewChange.addEventListener("click", (e) => {
  if (e.target.id === "list-view") {
    currentView = "list";
    gridView.style.backgroundColor = "white";
    listView.style.backgroundColor = "#EFF2F4";
    mainList.classList.add("list-layout"); // <-- key line
  } else if (e.target.id === "grid-view") {
    currentView = "grid";
    listView.style.backgroundColor = "white";
    gridView.style.backgroundColor = "#EFF2F4";
    mainList.classList.remove("list-layout"); // <-- back to grid
  }

  // re-render current products
  const currentProducts = Array.from(mainList.children).map(item => ({
    id: item.querySelector(".view__detail-link").href.split("id=")[1],
    title: item.querySelector(".item-desctext").innerText,
    price: parseFloat(item.querySelector(".item-price").innerText.replace("$", "")),
    description: item.querySelector(".row__item-detail").innerText,
    thumbnail: item.querySelector("img").src
  }));

  displayProducts(currentProducts);
});


  });
