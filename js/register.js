import {RegistrationNW} from "./network/registerNW.js";

const Ids = {
    username: "#register_username",
    email: "#register_email",
    password: "#register_password",
    confirm_password: "#register_confirm_password",
    submit: "#register_submit",
    form_register: "#form_register",
    btn_register: "#btn_register"
};

const Ele = {
    form_register: document.querySelector(Ids.form_register),
    username: document.querySelector(Ids.username),
    email: document.querySelector(Ids.email),
    password: document.querySelector(Ids.password),
    confirm_password: document.querySelector(Ids.confirm_password),
    submit: document.querySelector(Ids.submit)
};


function setListeners() {
    const fields = [{id: Ids.email, func: checkEmail},
        {id: Ids.username, func: checkUserName},
        {id: Ids.password, func: checkPassword},
        {id: Ids.confirm_password, func: matchPassword}];

    fields.forEach(field => {
        $(field.id).on("keypress", field.func);
        $(field.id).on("keyup", field.func);
    });
}

function init() {
    setListeners();
    Ele.form_register.addEventListener('submit', signUp);
    $(Ids.btn_register).on("click", () => {
        const fields = [Ids.username, Ids.email, Ids.password, Ids.confirm_password];
        clearFields(fields);
    });
}

function enableSubmit() {
    const inputs = [Ele.username, Ele.email, Ele.password, Ele.confirm_password];
    const result = inputs.map(el => {
        return el.classList.contains("is-valid");
    });
    if (!result.includes(false)) {
        if (Ele.submit.hasAttribute("disabled")) {
            Ele.submit.removeAttribute("disabled");
            Ele.submit.classList.toggle("disabled");
            Ele.submit.classList.toggle("button-disabled");
        }
    } else {
        if (!Ele.submit.hasAttribute("disabled")) {
            Ele.submit.setAttribute("disabled", true);
            Ele.submit.classList.toggle("disabled");
            Ele.submit.classList.toggle("button-disabled");
        }
    }
}

function checkUserName() {
    const text = Ele.username.value.trim();
    const pattern = /^[a-zA-Z0-9]{4,}$/;
    if (pattern.test(text)) {
        isExists("username", Ele.username, Ids.username, `Username already exists`);
    } else {
        classToggle(Ele.username.classList);
        const error = text.length < 4 ? "Username must have at list 4 character" : "Enter digits and characters only";
        errorMessage(Ele.username.classList, Ids.username, error);
    }
}

function checkEmail() {
    const text = Ele.email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;

    if (pattern.test(text)) {
        isExists("email", Ele.email, Ids.email, "Email address already registered");
    } else {
        classToggle(Ele.email.classList);
        errorMessage(Ele.email.classList, Ids.email, "Enter valid email address");
    }
}

function checkPassword() {
    const password = Ele.password.value;
    if (password.search(" ") > 0) {
        classToggle(Ele.password.classList);
        errorMessage(Ele.password.classList, Ids.password, "Password does not include any space");
        return;
    }
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})");
    if (pattern.test(password)) {
        isExists("password", Ele.password, Ids.password, "Password not available");
    } else {
        classToggle(Ele.password.classList);
        errorMessage(Ele.password.classList, Ids.password, "Must have at least 6 character with one digit, uppercase and special char");
    }
}

function matchPassword() {
    const confirm_pass = Ele.confirm_password.value.trim();
    const password = Ele.password.value.trim();
    if (confirm_pass === password) {
        classToggle(Ele.confirm_password.classList, "is-invalid");
        errorMessage(Ele.confirm_password.classList, Ids.confirm_password, "", "is-valid");
        enableSubmit();
    } else {
        classToggle(Ele.confirm_password.classList);
        errorMessage(Ele.confirm_password.classList, Ids.confirm_password, "Password does not match");
        enableSubmit();
    }
}

function clearFields(eleAry) {
    eleAry.forEach(el => {
        document.querySelector(el).value = "";
    });
}

function errorMessage(class_list, id, message = "", input_class = "is-invalid") {
    if (!class_list.contains(input_class)) {
        class_list.toggle(input_class);
    }
    document.querySelector(`${id} + div`).innerHTML = message;
}

function classToggle(class_list, input_class = "is-valid") {
    if (class_list.contains(input_class)) {
        class_list.toggle(input_class);
    }
}

function isExists(type, input, id, msg) {
    const value = input.value.trim();

    RegistrationNW.checkIsExists(type, value)
        .then(response => {

            const class_list = input.classList;
            if (response == -1) {
                classToggle(class_list);
                errorMessage(class_list, id, msg);
            } else if (response == 1) {
                classToggle(class_list, 'is-invalid');
                errorMessage(class_list, id, "", "is-valid");
                enableSubmit();
            }
        })
        .catch(err => alert(err));
}


function signUp(e) {
    e.preventDefault();

    const username = Ele.username.value.trim();
    const email = Ele.email.value.trim();
    const password = Ele.password.value.trim();

    RegistrationNW.getSignUpProcess(username, email, password)
        .then(response => {
            $('#registerModel').modal('hide');
            $('#successModel').modal('show');
        })
        .catch(err => {
            $('#registerModel').modal('hide');
            alert(err);
        });
}


init();