/* ------------------------------- start toggle menu ------------------------------ */
let menu = document.getElementById("menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("open");
}
window.onload = () => {
    setCountries();
    checkLogIn();
    getCartItems();
    getCartQuantity();
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
/* ----------------------------- end toggle menu ---------------------------- */
/* ------------------------------- start countries select ------------------------------ */
// All countries
// length 252
const countries = [
    {name: "Afghanistan",code: "AF"},
    {name: "Åland Islands",code: "AX"},
    {name: "Albania",code: "AL"},
    {name: "Algeria",code: "DZ"},
    {name: "American Samoa",code: "AS"},
    {name: "Andorra",code: "AD"},
    {name: "Angola",code: "AO"},
    {name: "Anguilla",code: "AI"},
    {name: "Antarctica",code: "AQ"},
    {name: "Antigua & Barbuda",code: "AG"},
    {name: "Argentina",code: "AR"},
    {name: "Armenia",code: "AM"},
    {name: "Aruba",code: "AW"},
    {name: "Australia",code: "AU"},
    {name: "Austria",code: "AT"},
    {name: "Azerbaijan",code: "AZ"},
    {name: "Bahamas",code: "BS"},
    {name: "Bahrain",code: "BH"},
    {name: "Bangladesh",code: "BD"},
    {name: "Barbados",code: "BB"},
    {name: "Belarus",code: "BY"},
    {name: "Belgium",code: "BE"},
    {name: "Belize",code: "BZ"},
    {name: "Benin",code: "BJ"},
    {name: "Bermuda",code: "BM"},
    {name: "Bhutan",code: "BT"},
    {name: "Bolivia",code: "BO"},
    {name: "Caribbean Netherlands",code: "BQ"},
    {name: "Bosnia & Herzegovina",code: "BA"},
    {name: "Botswana",code: "BW"},
    {name: "Bouvet Island",code: "BV"},
    {name: "Brazil",code: "BR"},
    {name: "British Indian Ocean Territory",code: "IO"},
    {name: "Brunei",code: "BN"},
    {name: "Bulgaria",code: "BG"},
    {name: "Burkina Faso",code: "BF"},
    {name: "Burundi",code: "BI"},
    {name: "Cambodia",code: "KH"},
    {name: "Cameroon",code: "CM"},
    {name: "Canada",code: "CA"},
    {name: "Cape Verde",code: "CV"},
    {name: "Cayman Islands",code: "KY"},
    {name: "Central African Republic",code: "CF"},
    {name: "Chad",code: "TD"},
    {name: "Chile",code: "CL"},
    {name: "China",code: "CN"},
    {name: "Christmas Island",code: "CX"},
    {name: "Cocos (Keeling) Islands",code: "CC"},
    {name: "Colombia",code: "CO"},
    {name: "Comoros",code: "KM"},
    {name: "Congo - Brazzaville",code: "CG"},
    {name: "Congo - Kinshasa",code: "CD"},
    {name: "Cook Islands",code: "CK"},
    {name: "Costa Rica",code: "CR"},
    {name: "Côte d’Ivoire",code: "CI"},
    {name: "Croatia",code: "HR"},
    {name: "Cuba",code: "CU"},
    {name: "Curaçao",code: "CW"},
    {name: "Cyprus",code: "CY"},
    {name: "Czechia",code: "CZ"},
    {name: "Denmark",code: "DK"},
    {name: "Djibouti",code: "DJ"},
    {name: "Dominica",code: "DM"},
    {name: "Dominican Republic",code: "DO"},
    {name: "Ecuador",code: "EC"},
    {name: "Egypt",code: "EG"},
    {name: "El Salvador",code: "SV"},
    {name: "Equatorial Guinea",code: "GQ"},
    {name: "Eritrea",code: "ER"},
    {name: "Estonia",code: "EE"},
    {name: "Ethiopia",code: "ET"},
    {name: "Falkland Islands (Islas Malvinas)",code: "FK"},
    {name: "Faroe Islands",code: "FO"},
    {name: "Fiji",code: "FJ"},
    {name: "Finland",code: "FI"},
    {name: "France",code: "FR"},
    {name: "French Guiana",code: "GF"},
    {name: "French Polynesia",code: "PF"},
    {name: "French Southern Territories",code: "TF"},
    {name: "Gabon",code: "GA"},
    {name: "Gambia",code: "GM"},
    {name: "Georgia",code: "GE"},
    {name: "Germany",code: "DE"},
    {name: "Ghana",code: "GH"},
    {name: "Gibraltar",code: "GI"},
    {name: "Greece",code: "GR"},
    {name: "Greenland",code: "GL"},
    {name: "Grenada",code: "GD"},
    {name: "Guadeloupe",code: "GP"},
    {name: "Guam",code: "GU"},
    {name: "Guatemala",code: "GT"},
    {name: "Guernsey",code: "GG"},
    {name: "Guinea",code: "GN"},
    {name: "Guinea-Bissau",code: "GW"},
    {name: "Guyana",code: "GY"},
    {name: "Haiti",code: "HT"},
    {name: "Heard & McDonald Islands",code: "HM"},
    {name: "Vatican City",code: "VA"},
    {name: "Honduras",code: "HN"},
    {name: "Hong Kong",code: "HK"},
    {name: "Hungary",code: "HU"},
    {name: "Iceland",code: "IS"},
    {name: "India",code: "IN"},
    {name: "Indonesia",code: "ID"},
    {name: "Iran",code: "IR"},
    {name: "Iraq",code: "IQ"},
    {name: "Ireland",code: "IE"},
    {name: "Isle of Man",code: "IM"},
    {name: "Israel",code: "IL"},
    {name: "Italy",code: "IT"},
    {name: "Jamaica",code: "JM"},
    {name: "Japan",code: "JP"},
    {name: "Jersey",code: "JE"},
    {name: "Jordan",code: "JO"},
    {name: "Kazakhstan",code: "KZ"},
    {name: "Kenya",code: "KE"},
    {name: "Kiribati",code: "KI"},
    {name: "North Korea",code: "KP"},
    {name: "South Korea",code: "KR"},
    {name: "Kosovo",code: "XK"},
    {name: "Kuwait",code: "KW"},
    {name: "Kyrgyzstan",code: "KG"},
    {name: "Laos",code: "LA"},
    {name: "Latvia",code: "LV"},
    {name: "Lebanon",code: "LB"},
    {name: "Lesotho",code: "LS"},
    {name: "Liberia",code: "LR"},
    {name: "Libya",code: "LY"},
    {name: "Liechtenstein",code: "LI"},
    {name: "Lithuania",code: "LT"},
    {name: "Luxembourg",code: "LU"},
    {name: "Macao",code: "MO"},
    {name: "North Macedonia",code: "MK"},
    {name: "Madagascar",code: "MG"},
    {name: "Malawi",code: "MW"},
    {name: "Malaysia",code: "MY"},
    {name: "Maldives",code: "MV"},
    {name: "Mali",code: "ML"},
    {name: "Malta",code: "MT"},
    {name: "Marshall Islands",code: "MH"},
    {name: "Martinique",code: "MQ"},
    {name: "Mauritania",code: "MR"},
    {name: "Mauritius",code: "MU"},
    {name: "Mayotte",code: "YT"},
    {name: "Mexico",code: "MX"},
    {name: "Micronesia",code: "FM"},
    {name: "Moldova",code: "MD"},
    {name: "Monaco",code: "MC"},
    {name: "Mongolia",code: "MN"},
    {name: "Montenegro",code: "ME"},
    {name: "Montserrat",code: "MS"},
    {name: "Morocco",code: "MA"},
    {name: "Mozambique",code: "MZ"},
    {name: "Myanmar (Burma)",code: "MM"},
    {name: "Namibia",code: "NA"},
    {name: "Nauru",code: "NR"},
    {name: "Nepal",code: "NP"},
    {name: "Netherlands",code: "NL"},
    {name: "Curaçao",code: "AN"},
    {name: "New Caledonia",code: "NC"},
    {name: "New Zealand",code: "NZ"},
    {name: "Nicaragua",code: "NI"},
    {name: "Niger",code: "NE"},
    {name: "Nigeria",code: "NG"},
    {name: "Niue",code: "NU"},
    {name: "Norfolk Island",code: "NF"},
    {name: "Northern Mariana Islands",code: "MP"},
    {name: "Norway",code: "NO"},
    {name: "Oman",code: "OM"},
    {name: "Pakistan",code: "PK"},
    {name: "Palau",code: "PW"},
    {name: "Palestine",code: "PS"},
    {name: "Panama",code: "PA"},
    {name: "Papua New Guinea",code: "PG"},
    {name: "Paraguay",code: "PY"},
    {name: "Peru",code: "PE"},
    {name: "Philippines",code: "PH"},
    {name: "Pitcairn Islands",code: "PN"},
    {name: "Poland",code: "PL"},
    {name: "Portugal",code: "PT"},
    {name: "Puerto Rico",code: "PR"},
    {name: "Qatar",code: "QA"},
    {name: "Réunion",code: "RE"},
    {name: "Romania",code: "RO"},
    {name: "Russia",code: "RU"},
    {name: "Rwanda",code: "RW"},
    {name: "St. Barthélemy",code: "BL"},
    {name: "St. Helena",code: "SH"},
    {name: "St. Kitts & Nevis",code: "KN"},
    {name: "St. Lucia",code: "LC"},
    {name: "St. Martin",code: "MF"},
    {name: "St. Pierre & Miquelon",code: "PM"},
    {name: "St. Vincent & Grenadines",code: "VC"},
    {name: "Samoa",code: "WS"},
    {name: "San Marino",code: "SM"},
    {name: "São Tomé & Príncipe",code: "ST"},
    {name: "Saudi Arabia",code: "SA"},
    {name: "Senegal",code: "SN"},
    {name: "Serbia",code: "RS"},
    {name: "Serbia",code: "CS"},
    {name: "Seychelles",code: "SC"},
    {name: "Sierra Leone",code: "SL"},
    {name: "Singapore",code: "SG"},
    {name: "Sint Maarten",code: "SX"},
    {name: "Slovakia",code: "SK"},
    {name: "Slovenia",code: "SI"},
    {name: "Solomon Islands",code: "SB"},
    {name: "Somalia",code: "SO"},
    {name: "South Africa",code: "ZA"},
    {name: "South Georgia & South Sandwich Islands",code: "GS"},
    {name: "South Sudan",code: "SS"},
    {name: "Spain",code: "ES"},
    {name: "Sri Lanka",code: "LK"},
    {name: "Sudan",code: "SD"},
    {name: "Suriname",code: "SR"},
    {name: "Svalbard & Jan Mayen",code: "SJ"},
    {name: "Eswatini",code: "SZ"},
    {name: "Sweden",code: "SE"},
    {name: "Switzerland",code: "CH"},
    {name: "Syria",code: "SY"},
    {name: "Taiwan",code: "TW"},
    {name: "Tajikistan",code: "TJ"},
    {name: "Tanzania",code: "TZ"},
    {name: "Thailand",code: "TH"},
    {name: "Timor-Leste",code: "TL"},
    {name: "Togo",code: "TG"},
    {name: "Tokelau",code: "TK"},
    {name: "Tonga",code: "TO"},
    {name: "Trinidad & Tobago",code: "TT"},
    {name: "Tunisia",code: "TN"},
    {name: "Turkey",code: "TR"},
    {name: "Turkmenistan",code: "TM"},
    {name: "Turks & Caicos Islands",code: "TC"},
    {name: "Tuvalu",code: "TV"},
    {name: "Uganda",code: "UG"},
    {name: "Ukraine",code: "UA"},
    {name: "United Arab Emirates",code: "AE"},
    {name: "United Kingdom",code: "GB"},
    {name: "United States",code: "US"},
    {name: "U.S. Outlying Islands",code: "UM"},
    {name: "Uruguay",code: "UY"},
    {name: "Uzbekistan",code: "UZ"},
    {name: "Vanuatu",code: "VU"},
    {name: "Venezuela",code: "VE"},
    {name: "Vietnam",code: "VN"},
    {name: "British Virgin Islands",code: "VG"},
    {name: "U.S. Virgin Islands",code: "VI"},
    {name: "Wallis & Futuna",code: "WF"},
    {name: "Western Sahara",code: "EH"},
    {name: "Yemen",code: "YE"},
    {name: "Zambia",code: "ZM"},
    {name: "Zimbabwe",code: "ZW"}
];
function setCountries() {
    let countrySelect = window.document.getElementById('country');
    for (const cnt of countries) {
        countrySelect.innerHTML+='<option id="' + cnt.code + '" value="' + cnt.code + '">' + cnt.name + '</option>';
    }
}
/* ------------------------------- end contries select ------------------------------ */
/* ------------------------------- start get items from local storage ------------------------------ */
function increaseQuantity(evt) {
    let quantityInput = evt.target.localName == "i" ? evt.target.parentElement.previousElementSibling.children[1] : evt.target.previousElementSibling.children[1];
    quantityInput.value = quantityInput.value < 10 ? Number(quantityInput.value) + 1 : quantityInput.value;
    let itemsArray = JSON.parse(localStorage.getItem("CartItems"));
    itemsArray.find((ele)=>{
        if (ele.id == quantityInput.id.slice(15)) {
            console.log("foundit");
            ele.quantity = Number(quantityInput.value);
            return ele;
        }
    })
    localStorage.setItem("CartItems", JSON.stringify(itemsArray));
    getCartQuantity();
}
function decreaseQuantity(evt) {
    let quantityInput = evt.target.localName == "i" ? evt.target.parentElement.nextElementSibling.children[1] : evt.target.nextElementSibling.children[1];
    quantityInput.value = quantityInput.value > 1 ? Number(quantityInput.value) - 1 : quantityInput.value;
    let itemsArray = JSON.parse(localStorage.getItem("CartItems"));
    itemsArray.find((ele)=>{
        if (ele.id == quantityInput.id.slice(15)) {
            // console.log("foundit");
            ele.quantity = Number(quantityInput.value);
            return ele;
        }
    })
    localStorage.setItem("CartItems", JSON.stringify(itemsArray));
    getCartQuantity();
}
function removeItem(evt) {
    let itemDiv = evt.target.parentElement.parentElement;
    let cartItemsArray = JSON.parse(localStorage.getItem("CartItems"));
    let counter = 0;
    cartItemsArray.find(function(ele){
        if (ele.id == itemDiv.id.slice(5)) {
            cartItemsArray.splice(counter, 1);
            return ele;
        }
        counter++;
    });
    localStorage.setItem("CartItems", JSON.stringify(cartItemsArray));
    getCartQuantity();
    itemDiv.nextElementSibling.remove();
    itemDiv.remove();
}
function getCartItems() {
    if (localStorage.getItem("CartItems") && JSON.parse(localStorage.getItem("CartItems")).length) {
        let itemsArray = JSON.parse(localStorage.getItem("CartItems"));
        let cartContainer = window.document.querySelector(".cart-container");
        itemsArray.forEach(element => {
            cartContainer.innerHTML += `
                <div id="item-${element.id}" class="item">
                    <figure class="img-figure">
                        <img src="${element.image1}" class="item-img" alt="">
                        <figcaption class="item-details">
                            <span class="item-name">${element.name}</span>
                            <span class="item-category">${element.category}</span>
                            <span class="item-price">${element.price}</span>
                        </figcaption>
                    </figure>
                    <div class="item-controls">
                        <button id="decrease-quantity-${element.id}" class="decrease-quantity" onclick="decreaseQuantity(event)"><i class="fa-solid fa-minus"></i></button>
                        <div class="item-quantity">
                            <span class="Qty">Qty: </span>
                            <input id="quantity-input-${element.id}" type="number" min="1" max="100" value="${element.quantity}">
                        </div>
                        <button id="increase-quantity-${element.id}" class="increase-quantity" onclick="increaseQuantity(event)"><i class="fa-solid fa-plus"></i></button>
                        <button class="remove-item" onclick="removeItem(event)">Remove</button>
                    </div>
                    <div class="item-subtotal">
                        <span>Sub Total: </span>
                        &#160;${element.price.slice(1) * element.quantity}
                    </div>
                </div>
                <hr>
            `
        });
    } else {
        let placeOrderBtn = window.document.getElementById("place-order");
        placeOrderBtn.style.cursor = "not-allowed";
        placeOrderBtn.setAttribute("disabled", "disabled");
        let cartContainer = window.document.querySelector(".cart-container");
        cartContainer.innerHTML += `
            <div style="align-self: center; font-size: 40px; padding-top: 15px;">
                Your Cart Is Empty!
            </div>`;
    }
}
function placeOrder(evt) {
    let popUp = window.document.getElementById("msg-box");
    let popUpMsg = window.document.getElementById("msg");
    evt.preventDefault();
    localStorage.setItem("CartItems", "[]");
    popUp.style.display = "flex";
    popUpMsg.textContent = `Your Order Was Submitted Successfully And We Will Contact You Soon`;
}
function closePopUp(evt) {
    evt.target.parentElement.style.display = "none";
}
/* ------------------------------- end get items from local storage ------------------------------ */
function checkLogIn() {
    let signIn = window.document.getElementById("Sign In");
    let userGreeting = window.document.getElementById("user");
    let activeUser = getCookie("ActiveUser");
    let userObj = JSON.parse(localStorage.getItem("users")).find((ele) => ele.username == activeUser);
    let userPhoneNumber = window.document.getElementById("phone");
    let userAddress = window.document.getElementById("address");
    let username = window.document.getElementById("username");
    if(activeUser) {
        signIn.textContent = "Logout";
        signIn.onclick = logout();
        userGreeting.textContent = `Hello ${activeUser}`;
        userAddress.value = userObj.address;
        userPhoneNumber.value = userObj.phone;
        username.value = userObj.username;
    } else {
        userGreeting.textContent = "";
    }
}

function logout() {
    removeCookie("ActiveUser");
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
        console.log(expireDate);
        window.document.cookie = `${cName}=${cValue}; expires=${expireDate};path=/`;
        return `Cookie Created Successfully.`;
    }
}
function removeCookie(cName) {
    if (getCookie(cName)) {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() - 1);
        window.document.cookie = `${cName}=; expires=${expireDate}`;
        return `${cName} Cookie Removed Successfully.`;
    }
    return `${cName} Cookie Doesn't Exist.`;
}

