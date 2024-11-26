function register(evt) {
    evt.preventDefault();
    let username = window.document.getElementById("username-register-input");
    let password = window.document.getElementById("password-register-input");
    let address = window.document.getElementById("address-register-input");
    let phone = window.document.getElementById("phone-register-input");
    let popUp = window.document.getElementById("msg-box");
    let popUpMsg = window.document.getElementById("msg");
    let newUser = {
        "username" : username.value,
        "password" : password.value,
        "address" : address.value,
        "phone" : phone.value
    }
    if (localStorage.getItem("users")) {
        let usersArray = JSON.parse(localStorage.getItem("users"));
        let tryFindUser = usersArray.find(ele => ele.username == username.value)
        if (tryFindUser) {
            popUp.style.display = "flex";
            popUpMsg.textContent = `${tryFindUser.username} Already Exist, Please Login`;
            return;
        } else {
            usersArray.push(newUser);
            localStorage.setItem("users", JSON.stringify(usersArray));
            return;
        }
    } else {
        localStorage.setItem("users", JSON.stringify([newUser]));
    }
    popUp.style.display = "flex";
    popUpMsg.textContent = `${username.value} Registered Successfully Now You Can Log In`;
    showLoginForm();
}
function login(evt) {
    evt.preventDefault();
    let username = window.document.getElementById("username-input");
    let password = window.document.getElementById("password-input");
    let popUp = window.document.getElementById("msg-box");
    let popUpMsg = window.document.getElementById("msg");
    if (localStorage.getItem("users")) {
        let usersArray = JSON.parse(localStorage.getItem("users"));
        let tryFindUsername = usersArray.find((ele) => {
            return ele.username == username.value;
        })
        if (tryFindUsername) {
            if (getCookie("ActiveUser")) {
                popUp.style.display = "flex";
                popUpMsg.textContent = `${tryFindUsername.username} Is Already Logged In`;
                return;
            } else {
                if (tryFindUsername.password == password.value) {
                    createCookie("ActiveUser", tryFindUsername.username, 3);
                    window.location.href = "../home/index.html";
                    return;
                } else {
                    popUp.style.display = "flex";
                    popUpMsg.textContent = `Password Is Incorrect For User ${tryFindUsername.username}.`;
                    return;
                }
            }
        }
    }
    popUp.style.display = "flex";
    popUpMsg.textContent = `Username (${username.value}) Is Not Found, Please Register First.`;
    return;
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


function showSignupForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    let formContainer = document.getElementById("form-container");
    formContainer.style.height = "65%";
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
}

function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    let formContainer = document.getElementById("form-container");
    formContainer.style.height = "50%";
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
}
function closePopUp(evt) {
    console.log(evt);
    evt.target.parentElement.style.display = "none";
}