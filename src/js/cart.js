import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("customer-cart") || [];
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
 
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    document.querySelector(".cartTotal").textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector(".cartFooter").classList.remove("hide");
  } else {
    document.querySelector(".product-list").innerHTML = "";
    // document.querySelector(".cartTotal").innerHTML = "";
    document.querySelector(".cartFooter").classList.add("hide");
  }

  removeFeature();
}

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

function removeFeature() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function removeItemFromCart(event) {
  const itemId = event.target.dataset.id;
  let cartItems = getLocalStorage("customer-cart") || [];
  const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage("customer-cart", cartItems);

    renderCartContents();
  }
}

renderCartContents();
