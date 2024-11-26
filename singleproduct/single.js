window.onload = onLoadFunction();
function onLoadFunction() {
  if (getCookie("ActiveUser")) {
  const Sign = document.getElementById("Sign In");
  const userGreetings = document.getElementById("user");
  userGreetings.textContent = `Hello ${getCookie("ActiveUser")}`;
  Sign.textContent = "Logout";
  Sign.setAttribute("onclick", "logout()");
  Sign.removeAttribute("href");
} else {
  const user = document.getElementById("user");
  user.textContent = "";
}
  getCartQuantity();
    let mainimage = document.getElementById("main-img");
    let smallimage = document.getElementsByClassName("image");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("desctiption");
    let addBtn = document.getElementById("add-btn");
    smallimage[0].onclick = () => {mainimage.src = smallimage[0].src}
    smallimage[1].onclick = () => {mainimage.src = smallimage[1].src}
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../data.json");
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.response);
            let url = new URL(window.location.href);
            
            let id = url.searchParams.get("id") || 1;
            let product;
            let category;
            for (const key in data) {
                product = data[key].find((obj) => obj.id == id);
                if (product) {
                    category = key;
                    break;
                }
            }
            addBtn.itemid = product.id;
            addBtn.itemprice = product.price;
            addBtn.itemname = product.name;
            addBtn.itemimg = product.image1;
            addBtn.itemcategory = category;
            title.innerHTML = product.name;
            price.innerHTML =  product.price;
            description.innerHTML = product.desc;
            mainimage.src = product.image1;
            smallimage[0].src = product.image2;
            smallimage[1].src = product.image1;
        }
    }
    xhr.send();
}
function getCartQuantity() {
    let  cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
    let quantity = 0;
    let cartCount = window.document.getElementById("cart-count");    
    if(cartItems.length > 0) {
        for (const key of cartItems) {
            quantity += key.quantity;
        }
    }
    cartCount.textContent = quantity;
}
function addToCart(evt) {
    quantityInput = window.document.getElementById("quantity-input");
    let itemData = evt.target;
    let cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
    let tryFindItem = cartItems.find(function (ele) {
        ele.quantity == quantityInput.value;
        return ele.id == evt.target.itemid;
    });
    if (!tryFindItem) {
        cartItems.push({
            id: itemData.itemid,
            name: itemData.itemname,
            price: itemData.itemprice,
            category: itemData.itemcategory,
            image1: itemData.itemimg,
            quantity: 1,
        });
    }
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  getCartQuantity();
}
function increaseQuantity(evt) {
    let quantityInput = evt.target.localName == "i" ? evt.target.parentElement.previousElementSibling.children[1] : evt.target.previousElementSibling.children[1];
    quantityInput.value = quantityInput.value < 10 ? Number(quantityInput.value) + 1 : quantityInput.value;
}
function decreaseQuantity(evt) {
    let quantityInput = evt.target.localName == "i" ? evt.target.parentElement.nextElementSibling.children[1] : evt.target.nextElementSibling.children[1];
    quantityInput.value = quantityInput.value > 1 ? Number(quantityInput.value) - 1 : quantityInput.value;
}
function getCookie(cName) {
    let documentCookies = window.document.cookie;
    let cookiesArray = documentCookies.split(";");
    let te = cookiesArray.find((ele) => {
        return ele.startsWith(cName);
    })
    return te ? te.split("=")[1] : "";
}
