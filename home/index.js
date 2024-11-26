/* -------------------------------------------------------------------------- */
/*                            Home Page JavaScript                            */
/* -------------------------------------------------------------------------- */
/* ------------------------------- start toggle menu ------------------------------ */
let menu = document.getElementById("menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("open");
};
/* ----------------------------- end toggle menu ---------------------------- */
/* ----------------------------- cookie username ---------------------------- */
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
function logout() {
  removeCookie("ActiveUser");
  location.reload();
}
function getCookie(cName) {
  let documentCookies = window.document.cookie;
  let cookiesArray = documentCookies.split(";");
  let te = cookiesArray.find((ele) => {
      return ele.startsWith(cName);
  })
  return te ? te.split("=")[1] : "";
}
function createCookie(cName, cValue, daysTillExpire) {
  if (getCookie(cName)) {
      return `Cookie ${cValue} is Already Exist.`;
  } else {
      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + daysTillExpire);
      window.document.cookie = `${cName}=${cValue}; expires=${expireDate};path=/`;
      return `Cookie Created Successfully.`;
  }
}
function removeCookie(cName) {
  if (getCookie(cName)) {
      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() - 2);
      window.document.cookie = `${cName}=${getCookie(cName)};expires=${expireDate};path=/`;
      return `${cName} Cookie Removed Successfully.`;
  }
  return `${cName} Cookie Doesn't Exist.`;
}
function getDetails(id) {
  window.location = `../singleproduct/single.html?id=${id}`;
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
getCartQuantity();
