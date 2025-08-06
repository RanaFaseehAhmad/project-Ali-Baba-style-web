// Footer
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Header
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Get Product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // If an ID is passed, fetch product details
    if (productId) {
      fetchProductDetail(productId);
    }

    // Fetch product details by ID
    async function fetchProductDetail(id) {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();
        console.log(product)
        displayProductDetail(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    // Display the product in the cart
    function displayProductDetail(product) {
      const cartList = document.querySelector(".cart__item-list");

      // Remove any old product items but keep the back/remove buttons
      // const oldItems = cartList.querySelectorAll(".cart__item");
      // oldItems.forEach(item => item.remove());

      // Create new cart item
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart__item");
      cartItem.innerHTML = `
        <div class="item-img">
            <img src="${product.thumbnail}" alt="${product.title}">
        </div>
        <div class="item-main">
            <div class="item-desc">
                <h1 class="item-title">${product.title}</h1>
                <h1 class="item-size">Category: ${product.category}, Brand: ${product.brand || 'N/A'}</h1>
                <h1 class="seller-name">Seller: ${product.brand || 'Unknown Seller'}</h1>
            </div>
            <div class="buttons">
                <button class="remove-item-btn">Remove</button>
                <button class="save-item-btn">Save for later</button>
            </div>
        </div>
        <div class="item-amount">
            <h1 class="item-price">$${product.price}</h1>
            <div class="quantity">
                <label for="item-quantity">Quantity</label>
                <input class="item-quantity" name="item-quantity" type="number" value="1" placeholder="Qty: 1">
            </div>
        </div>
      `;
      const itemQuantity = cartItem.querySelector(".item-quantity");

      function updateSubtotal() {
        const productPrice = product.price * parseInt(itemQuantity.value);
        const totalPrice = Math.round(productPrice - (productPrice * 0.08) + 14);
        // tofixed(2) mean after point(decimal) only two digits shown
        document.querySelector(".subtotal-amount").innerHTML = `$${productPrice.toFixed(2)}`;
        document.querySelector(".discount-amount").innerHTML = `- ${product.discountPercentage}%`;
        document.querySelector(".total-amount").innerHTML = `$${totalPrice}`;

      }

      // Initial calculation
      updateSubtotal();

      // Update subtotal whenever quantity changes
      itemQuantity.addEventListener("input", updateSubtotal);


      const subtotalAmount = document.querySelector(".subtotal-amount")
      subtotalAmount.innerHTML = `$${product.price}`
      const discountAmount = document.querySelector(".discount-amount")
      discountAmount.innerHTML = `$${product.discountPercentage}`
      const taxAmount = document.querySelector(".tax-amount")
      taxAmount.innerHTML = `+$14`





      // Insert before the back/remove buttons
      const backButtons = cartList.querySelector(".backbtn-removebtn");
      cartList.insertBefore(cartItem, backButtons);

      // ✅ Attach remove button functionality AFTER item is in DOM
      const removeItemBtn = cartItem.querySelector(".remove-item-btn");
      removeItemBtn.addEventListener("click", () => {
        cartItem.remove(); // ✅ Removes the whole cart item
        document.querySelector(".subtotal-amount").innerHTML = 0;
        document.querySelector(".discount-amount").innerHTML = 0;
        document.querySelector(".total-amount").innerHTML = 0;


      });
    }
  });
