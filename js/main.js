var userName = document.getElementById("urname");
var email = document.getElementById("email");
var newEmail = document.getElementById("newEmail");
var newPassword = document.getElementById("newPassword");
var password = document.getElementById("password");
var accounts = [];



if (localStorage.getItem("accountsList") == null) {
    accounts = [];
}
else {
    accounts = JSON.parse(localStorage.getItem("accountsList"))
}

function signUp() {
    addAccount();
}

function addAccount() {
    var account =
    {
        accEmail: newEmail.value,
        accPassword: newPassword.value,
        accName: userName.value
    }
    if (userName.value == "" || newEmail.value == "" || newPassword.value == "") {
        alert("please Enter Required Data")
    }
    var emailTaken = false;
    for (i = 0; i < accounts.length; i++) {
        if (accounts[i].accEmail.toLowerCase() == newEmail.value.toLowerCase()) {
            emailTaken = true
        }
    }
    if (!emailValidation(account.accEmail)) {
        alert("please enter a valid Email")
    }
    else if (emailTaken) {
        alert("this email is taken try another one")
    }
    else {
        accounts.push(account);
        localStorage.setItem("accountsList", JSON.stringify(accounts));
        var successP = document.getElementById("successP")
        successP.classList.remove("d-none")
    }
}

var urName;

function signIn() {
    var emailExist = false;
    var passwordExist = false;
    for (i = 0; i < accounts.length; i++) {
        if (email.value.toLowerCase() == accounts[i].accEmail.toLowerCase() && password.value == accounts[i].accPassword) {
            anchor.click();
            urName = accounts[i].accName;
            localStorage.setItem("userName", JSON.stringify(urName));
        }
        if (email.value.toLowerCase() == accounts[i].accEmail.toLowerCase()) {
            emailExist = true
        }
        if (password.value == accounts[i].accPassword) {
            passwordExist = true
        }
    }
    if (email.value == "" || password.value == "") {
        alert("please Enter Required Data")
    }

    var wrongEmail = document.getElementById("wrongEmail")
    var wrongPassword = document.getElementById("wrongPassword")
    var wrongEmailAndPassword = document.getElementById("wrongEmailAndPassword")

    if (!emailExist && !passwordExist) {

        wrongEmailAndPassword.classList.remove("d-none")
        wrongEmail.classList.add("d-none")
        wrongPassword.classList.add("d-none")
    } else {
        if (!emailExist) {
            wrongPassword.classList.add("d-none")
            wrongEmailAndPassword.classList.add("d-none")
            wrongEmail.classList.remove("d-none")
        }
        else if (!passwordExist) {
            wrongEmail.classList.add("d-none")
            wrongPassword.classList.remove("d-none")
            wrongEmailAndPassword.classList.add("d-none")
        }
    }
}

function emailValidation(email) {
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (emailregex.test(email)) {
        return true
    }
}

var anchor = document.createElement('a');
anchor.href = 'success.html';

function showName() {
    document.getElementById("welcome").innerHTML = `Welcome ${JSON.parse(localStorage.getItem("userName", JSON.stringify(urName)))}`
}

