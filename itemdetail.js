fetch('navbar.html').then(res => res.text()).then(data => document.getElementById("navbar").innerHTML = data);
fetch('footer.html').then(res => res.text()).then(data => document.getElementById("footer").innerHTML = data);
fetch('header.html').then(res => res.text()).then(data => {
  document.getElementById('header').innerHTML = data;

  // Get Product ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  console.log("Product ID:", productId);
  document.querySelectorAll("#button__cartbtn, #cartbtn").forEach(button => {
    button.addEventListener("click", () => {
      console.log("clicked")
      if (productId) {
        window.location.href = `cart.html?id=${productId}`;
      }
    })
  });

  async function fetchProductDetail(id) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await response.json();
      console.log("✅ Product fetched:", product);
      displayProductDetail(product);

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function displayProductDetail(product) {
    document.getElementById("img-gallery").style.display = "none"
    document.getElementById("main-img").src = product.thumbnail;
    document.getElementById("product-title").innerText = product.title;
    document.getElementById("product-price").innerText = `$${product.price}`;
    document.getElementById("item-data").innerText = `${product.category}`;
  }

  if (productId) {
    fetchProductDetail(productId);
  }

  // 
  const description = document.getElementById("description")
  const aboutSellerDesc = document.getElementById("about-seller-desc")
  document.getElementById("about-item-desc").addEventListener("click", () => {
    description.style.display = "flex"
    aboutSellerDesc.style.display = "none"
  })
  document.getElementById("about-seller-title").addEventListener("click", () => {
    console.log("clicked")
    // aboutSellerTitle.style.color = "#0067FF"
    description.style.display = "none"
    aboutSellerDesc.style.display = "flex"
  })





});
