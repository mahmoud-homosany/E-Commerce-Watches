function getCookie(cName) {
    let documentCookies = window.document.cookie;
    let cookiesArray = documentCookies.split(";");
    let te = cookiesArray.find((ele) => {
        return ele.startsWith(cName);
    })
    return te ? te.split("=")[1] : "";
}
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
let all_cards = document.querySelector(".all-cards")
let alldata;
let caetgoryData;
let xhrrequest = new XMLHttpRequest()
xhrrequest.open("get", "../data.json")
xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        alldata = JSON.parse(xhrrequest.response)
        caetgoryData = alldata.classic
        for (let i = 0; i < caetgoryData.length; i++) {
            let card = document.createElement("div")
            card.addEventListener("click", function() {
                window.location = `../singleproduct/single.html?id=${caetgoryData[i].id}`;
            })
            card.setAttribute("class", "card")
            let fig = document.createElement("figure")
            let imgee = document.createElement("img")
            imgee.setAttribute("src", caetgoryData[i].image1)
            fig.appendChild(imgee)
            let card_desc = document.createElement("div")
            card_desc.setAttribute("class", "card-desc")
            let h3 = document.createElement("h3")
            h3.textContent = caetgoryData[i].name
            let span = document.createElement("span")
            span.textContent = caetgoryData[i].price
            span.style.display = "block"
            span.style.fontSize = "18px"
            span.style.fontWeight = "bold"
            span.style.color = "rgb(32, 32, 32)"
            card_desc.appendChild(h3)
            card_desc.appendChild(span)
            let a_link = document.createElement("a")
            let h4 = document.createElement("h4")
            h4.setAttribute("id", caetgoryData[i].id)
            h4.setAttribute("class", "add-to-card")
            h4.textContent = "Add"
            a_link.setAttribute('onclick', "add_to_cart(event)")
            a_link.appendChild(h4)
            // Append
            card.appendChild(fig)
            card.appendChild(card_desc)
            card.appendChild(a_link)
            all_cards.appendChild(card)
        }
    }
}
xhrrequest.send()
function add_to_cart(evt) {
    let watchID = evt.target.id
    let watchData = caetgoryData.find(function (ele) { return ele.id == watchID; })
    if (localStorage.getItem("CartItems")) {
        let stringCartItems = localStorage.getItem("CartItems")
        let parsedItemsLocalStorage = JSON.parse(stringCartItems);
        console.log(parsedItemsLocalStorage);
        let isfound = parsedItemsLocalStorage.find(function (ele) {
            if (ele.id == watchID) {
                ele.quantity += 1;
                return ele;
            }
        })
        if (isfound == undefined) {
            watchData["quantity"] = 1
            parsedItemsLocalStorage.push(watchData);
        }
        let saveString = JSON.stringify(parsedItemsLocalStorage);
        localStorage.setItem("CartItems", saveString)
    } else {
        console.log("error");
        watchData["quantity"] = 1
        let stringWatchData = JSON.stringify([watchData])
        localStorage.setItem("CartItems", stringWatchData)
    }
}
function changeCategory(event) {
    all_cards.innerHTML = ""    // this to clear all iteams from the container not the json file then show anothers
    let xhrrequest = new XMLHttpRequest()
    xhrrequest.open("get", "../data.json")
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            alldata = JSON.parse(xhrrequest.response)
            caetgoryData = alldata[event.target.id];
            for (let i = 0; i < caetgoryData.length; i++) {
                let card = document.createElement("div");
                card.addEventListener("click", function() {
                    window.location = `../singleproduct/single.html?id=${caetgoryData[i].id}`;
                })
                card.setAttribute("class", "card")
                let fig = document.createElement("figure")
                let imgee = document.createElement("img")
                imgee.setAttribute("src", caetgoryData[i].image1)
                fig.appendChild(imgee)
                let card_desc = document.createElement("div")
                card_desc.setAttribute("class", "card-desc")
                let h3 = document.createElement("h3")
                h3.textContent = caetgoryData[i].name
                let span = document.createElement("span")
                span.textContent = caetgoryData[i].price
                span.style.display = "block"
                span.style.fontSize = "18px"
                span.style.color = "rgb(32, 32, 32)"
                card_desc.appendChild(h3)
                card_desc.appendChild(span)
                let a_link = document.createElement("a")
                let h4 = document.createElement("h4")
                h4.setAttribute("id", caetgoryData[i].id)
                h4.setAttribute("class", "add-to-card")
                h4.textContent = "Add"
                a_link.setAttribute('onclick', "add_to_cart(event)")
                a_link.appendChild(h4)
                card.appendChild(fig)
                card.appendChild(card_desc)
                card.appendChild(a_link)
              all_cards.appendChild(card)
              if (i == 6) {
                console.log(caetgoryData[i].image1);
              }
            }
        }
    }
    xhrrequest.send()
}
// all watches
function allwatch(event) {
    all_cards.innerHTML = ""    // this to clear all iteams from the container not the json file then show anothers
    let xhrrequest = new XMLHttpRequest()
    xhrrequest.open("get", "../data.json")
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            alldata = JSON.parse(xhrrequest.response)
            for (const key in alldata) {
                caetgoryData = alldata[key]
                for (let i = 0; i < caetgoryData.length; i++) {
                    let card = document.createElement("div")
                    let watchId = caetgoryData[i].id;
                    card.addEventListener("click", function() {
                        window.location = `../singleproduct/single.html?id=${watchId}`;
                    })
                    card.setAttribute("class", "card")
                    let fig = document.createElement("figure")
                    let imgee = document.createElement("img")
                    imgee.setAttribute("src", caetgoryData[i].image1)
                    fig.appendChild(imgee)
                    let card_desc = document.createElement("div")
                    card_desc.setAttribute("class", "card-desc")
                    let h3 = document.createElement("h3")
                    h3.textContent = caetgoryData[i].name
                    let span = document.createElement("span")
                    span.textContent = caetgoryData[i].price
                    span.style.display = "block"
                    span.style.fontSize = "18px"
                    span.style.color = "rgb(32, 32, 32)"
                    card_desc.appendChild(h3)
                    card_desc.appendChild(span)
                    let a_link = document.createElement("a")
                    let h4 = document.createElement("h4")
                    h4.setAttribute("id", caetgoryData[i].id)
                    h4.setAttribute("class", "add-to-card")
                    h4.textContent = "Add"
                    a_link.setAttribute('onclick', "add_to_cart(event)")
                    a_link.appendChild(h4)
                    card.appendChild(fig)
                    card.appendChild(card_desc)
                    card.appendChild(a_link)
                    all_cards.appendChild(card)
                }
            }
        }
    }
    xhrrequest.send()
}
