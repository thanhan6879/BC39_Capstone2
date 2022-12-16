var productService = new ProductService();


function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  var promise = productService.getListProductApi();

  promise
    .then(function (result) {
      renderHTML(result.data);
      var addCart = document.getElementsByClassName("price-icon");
      for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClick);
      }

      var removeCartbutton = document.getElementsByClassName("cart-remove");
      for (var i = 0; i < removeCartbutton.length; i++) {
        var button = removeCartbutton[i];
        button.addEventListener("click", removeCart);
      }

      // quantity
      var quantityInput = document.getElementsByClassName("cart-quantity");
      for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChange);
      }

      document
        .getElementsByClassName("button-buy")[0]
        .addEventListener("click", buyclick);

      function addCartClick(event) {
        var button = event.target;
        var shopProduct = button.parentElement;
        var titlecart =
          shopProduct.getElementsByClassName("typephone")[0].innerText;
        var price = shopProduct.getElementsByClassName("price")[0].innerText;
        var productImg =
          shopProduct.getElementsByClassName("product-img")[0].src;

        addProductCart(titlecart, price, productImg);
        totalPrice();
      }

      function addProductCart(titlecart, price, productImg) {
        var cartShop = document.createElement("div");
        cartShop.classList.add("cart-product", "mb-2");
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartProductName =
          cartContent.getElementsByClassName("cart-product-name");
        for (var i = 0; i < cartProductName.length; i++) {
          console.log(cartProductName);
          if (cartProductName[i].innerText === titlecart) {
            alert("This product is already add to cart");
            return;
          }
        }

        var cartProductContent = `
                <img
                  class="cart-img img-fluid"
                  src=${productImg}
                  alt=""
                />
                <div class="cart-text">
                  <div class="cart-product-name">${titlecart}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity" />
                </div>

                <i class="fa-solid fa-trash-can cart-remove"></i>
            
                `;
        cartShop.innerHTML = cartProductContent;
        cartContent.append(cartShop);
        cartShop
          .getElementsByClassName("cart-remove")[0]
          .addEventListener("click", removeCart);
        cartShop
          .getElementsByClassName("cart-quantity")[0]
          .addEventListener("click", quantityChange);
      }

      function removeCart(event) {
        var buttonclick = event.target;
        buttonclick.parentElement.remove();
        totalPrice();
      }

      function quantityChange(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
        }
        totalPrice();
      }

      function totalPrice() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartproducts = cartContent.getElementsByClassName("cart-product");
        var total = 0;
        for (var i = 0; i < removeCartbutton.length; i++) {
          var cartproduct = cartproducts[i];
          var priceEle = cartproduct.getElementsByClassName("cart-price")[0];
          var quantityEle =
            cartproduct.getElementsByClassName("cart-quantity")[0];
          var price = parseFloat(priceEle.innerText.replace("$", ""));
          var quantity = quantityEle.value;
          total = total + price * quantity;
        }
        document.getElementsByClassName("total-price")[0].innerText =
          "$" + total;
      }

      function buyclick() {
        alert("Check out");
        var cartContent = document.getElementsByClassName("cart-content")[0];
        while (cartContent.hasChildNodes()) {
          cartContent.removeChild(cartContent.firstChild);
        }
        totalPrice();
      }
    })

    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

function renderHTML(data) {
  var content = "";

  data.forEach(function (product) {
    content += `  <div class="col-3">
              <div class="product-card">
                    <img
                      src="${product.img}"
                      alt=""
                      class="img-fluid images-products product-img"
                    />   
                   
               
                  <p class="describe">
                    <span class="typephone">${product.name}</span> - ${product.desc}
                  </p>
                  <span class="price">$${product.price}</span>
                    <i class="fa-solid fa-cart-plus price-icon"></i>
               
              </div>
            </div>
    `;
  });
  getEle("productItems").innerHTML = content;
}

let cart = document.querySelector("#cart");

let cartIcon = document.querySelector(".cart-icon");

let closeCart = document.querySelector(".cart-close");

cartIcon.onclick = () => {
  cart.classList.add("show");
};

closeCart.onclick = () => {
  cart.classList.remove("show");
};


