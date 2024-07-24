//cart-effect
const headerCart = document.querySelector(".header-cart");
const mainCartLike = document.querySelector(".main-cart-like");
const tabCart = document.querySelector(".tab-cart span");
const cartContent = document.querySelector(".cart-content");

headerCart.addEventListener("click", function () {
  mainCartLike.classList.add("active");
  tabCart.classList.add("active");
  cartContent.classList.add("active");
  tabLike.classList.remove("active");
  likeContent.classList.remove("active");
});

tabCart.addEventListener("click", function () {
  tabCart.classList.add("active");
  cartContent.classList.add("active");
  tabLike.classList.remove("active");
  likeContent.classList.remove("active");
});

const quitBtn = document.querySelector("#quit");
quitBtn.addEventListener("click", function () {
  mainCartLike.classList.remove("active");
});

//likeList-effect
const headerLike = document.querySelector(".header-like-list");
const tabLike = document.querySelector(".tab-like span");
const likeContent = document.querySelector(".like-product-content");

headerLike.addEventListener("click", function () {
  mainCartLike.classList.add("active");
  tabLike.classList.add("active");
  likeContent.classList.add("active");
  tabCart.classList.remove("active");
  cartContent.classList.remove("active");
});
tabLike.addEventListener("click", function () {
  tabLike.classList.add("active");
  likeContent.classList.add("active");
  tabCart.classList.remove("active");
  cartContent.classList.remove("active");
});

//link product-buy-now.html
function locationCart() {
  location.href = "product-buy-now.html";
}

//check LocalStorage
function checkLocalCart() {
  var localCart = JSON.parse(localStorage.getItem("gioHang"));
  if (localCart == null) {
    localStorage.setItem("gioHang", JSON.stringify(myCart));
  }
}

function checkLocalLike() {
  var localLike = JSON.parse(localStorage.getItem("yeuThich"));
  if (localLike == null) {
    localStorage.setItem("yeuThich", JSON.stringify(likeArr));
  }
}

//check empty
var imgEmptyCart = document.querySelector(
  ".main-cart-like .cart-content .empty-cart"
);
function checkEmptyCart() {
  const cartBody = document.querySelector(" .cart-content .cart-body tr");
  if (cartBody !== null) {
    imgEmptyCart.classList.remove("active");
  } else {
    imgEmptyCart.classList.add("active");
  }
}

var imgEmptyLike = document.querySelector(
  ".main-cart-like .like-product-content .empty-like"
);
function checkEmptyLike() {
  const likeBody = document.querySelector(
    " .like-product-content  .like-body tr"
  );
  if (likeBody !== null) {
    imgEmptyLike.classList.remove("active");
  } else {
    imgEmptyLike.classList.add("active");
  }
}

//add cart
var myCart = new Array();
checkLocalCart();

const addItem = document.querySelector(".them");

if (addItem !== null) {
  addItem.addEventListener("click", function () {
    myCart = JSON.parse(localStorage.getItem("gioHang"));
    var product =
      addItem.parentElement.parentElement.parentElement.parentElement;
    var itemImg = product.querySelector(".main-img-all").src;
    var itemName = product.querySelector("h2").innerText;
    var itemPrice = product.querySelector("b").innerText;
    var item = {
      img: itemImg,
      name: itemName,
      price: itemPrice,
    };
    myCart.push(item);
    localStorage.setItem("gioHang", JSON.stringify(myCart));
    addCart(itemImg, itemName, itemPrice);
    checkEmptyCart();
  });
}

function addArray(button) {
  myCart = JSON.parse(localStorage.getItem("gioHang"));
  var product =
    button.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  var productImg = product.querySelector("img").src;
  var productName = product.querySelector("h3").innerText;
  var productPrice = product.querySelector("b").innerText;
  var item = {
    img: productImg,
    name: productName,
    price: productPrice,
  };
  myCart.push(item);
  localStorage.setItem("gioHang", JSON.stringify(myCart));
  addCart(productImg, productName, productPrice);
  checkEmptyCart();
}
function getLocalCart() {
  var localCart = JSON.parse(localStorage.getItem("gioHang"));
  for (var i = 0; i < localCart.length; i++) {
    addCart(localCart[i].img, localCart[i].name, localCart[i].price);
    cartTotal();
  }
  checkEmptyCart();
}
getLocalCart();

function deleteLocalCart(button) {
  var localCart = JSON.parse(localStorage.getItem("gioHang"));
  var product = button.parentElement.parentElement;
  var productImg = product.querySelector("img").src;
  var productPrice = product.querySelector("b").innerText;
  for (var i = 0; i < localCart.length; i++) {
    if (localCart[i].img == productImg && localCart[i].price == productPrice) {
      product.remove();
      cartTotal();
      localCart.splice(i, 1);
      localStorage.setItem("gioHang", JSON.stringify(localCart));
      break;
    }
  }
  checkEmptyCart();
}

function addCart(img, name, price) {
  var addtr = document.createElement("tr");
  var cartBody = document.querySelector(" .cart-content .cart-body");
  var trContent =
    ' <td class = "first-td"><img src="' +
    img +
    '" alt="" />' +
    name +
    "</td><td><b>" +
    price +
    '</b></td><td><input type="number" value="1" min="0" /></td> <td><div onclick="deleteLocalCart(this)" class="delete-cart"><span>Xóa</span></div></td>';
  addtr.innerHTML = trContent;
  cartBody.append(addtr);
  cartTotal();
}

function cartTotal() {
  var cartItem = document.querySelectorAll(" .cart-content .cart-body tr");
  var totalAll = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var itemPrice = cartItem[i].querySelector("b").innerHTML;
    var inputValue = cartItem[i].querySelector("input").value;
    var totalItem = itemPrice * inputValue;
    totalAll = totalAll + totalItem;
  }
  var totalPrice = document.querySelector(".total-price b");
  totalPrice.innerHTML = totalAll;
  inputChange();
}

function inputChange() {
  var cartQuatity = document.querySelectorAll(" .cart-content .cart-body tr");
  cartQuatity.forEach(function (input, index) {
    var inputValue = input.querySelector("input");
    inputValue.addEventListener("change", function () {
      cartTotal();
    });
  });
}

//like-product
var likeArr = new Array();
checkLocalLike();

function addLike(button) {
  likeArr = JSON.parse(localStorage.getItem("yeuThich"));
  var product =
    button.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  var productImg = product.querySelector("img").src;
  var productName = product.querySelector("h3").innerText;
  var productPrice = product.querySelector("b").innerText;
  var item = {
    img: productImg,
    name: productName,
    price: productPrice,
  };
  likeArr.push(item);
  localStorage.setItem("yeuThich", JSON.stringify(likeArr));
  addLikeList(productImg, productName, productPrice);
  checkEmptyLike();
}
function addLikeList(img, name, price) {
  var addtr = document.createElement("tr");
  var cartBody = document.querySelector(" .like-product-content .like-body");
  var trContent =
    ' <td class = "first-td"><img src="' +
    img +
    '" alt="" />' +
    name +
    "</td><td><b>" +
    price +
    '</b></td><td><div onclick="deleteLocalLike(this)" class="delete-cart"><span>Xóa</span></div></td>';
  addtr.innerHTML = trContent;
  cartBody.append(addtr);
}

function getLocalLike() {
  var localLike = JSON.parse(localStorage.getItem("yeuThich"));
  for (var i = 0; i < localLike.length; i++) {
    addLikeList(localLike[i].img, localLike[i].name, localLike[i].price);
  }
  checkEmptyLike();
}
getLocalLike();

function deleteLocalLike(button) {
  var localLike = JSON.parse(localStorage.getItem("yeuThich"));
  var product = button.parentElement.parentElement;
  var productImg = product.querySelector("img").src;
  var productPrice = product.querySelector("b").innerText;
  for (var i = 0; i < localLike.length; i++) {
    if (localLike[i].img == productImg && localLike[i].price == productPrice) {
      product.remove();
      localLike.splice(i, 1);
      localStorage.setItem("yeuThich", JSON.stringify(localLike));
      break;
    }
  }
  checkEmptyLike();
}
