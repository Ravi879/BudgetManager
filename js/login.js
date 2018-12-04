import {LoginProcess} from "./network/loginNW.js";

const Elements = {
    form_login: document.querySelector("#form_login"),
    email: document.querySelector("#login_email"),
    password: document.querySelector("#login_password"),
    login_btn: document.querySelector("#login_submit")
};

function init() {
    Elements.form_login.addEventListener('submit', login);
}

function login(e) {
    e.preventDefault();

    if (!isEmailValid())
        return;

    setSubmitBtnText(getLoadingSpinner());

    const email = Elements.email.value;
    const password = Elements.password.value;
    LoginProcess.login(email, password)
        .then(() => {
            $("#loginModal").modal('hide');
            window.location = "budget.php";
        }).catch((err) => {
        setSubmitBtnText("Login");
        alert(err);
    });

}

function setSubmitBtnText(text) {
    Elements.login_btn.innerHTML = text
}

function getLoadingSpinner() {
    return '<i class="fa fa-spinner fa-pulse "></i> Login';
}

function isEmailValid() {
    return Elements.email.checkValidity();
}


init();