export class RegistrationNW {
    static checkIsExists(type, value) {

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/registration.php", true);

            const params = `type=${type}&val=${value}`;
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onloadend = function () {
                const response = xhr.responseText.trim();
                resolve(response);
            };
            xhr.onerror = function () {
                reject("Technical error occurs. Please try again later.");
                console.log("Error during checking existence of field to db");
            };
            xhr.send(params);

        });
    }

    static getSignUpProcess(username, email, password) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/registration.php", true);

            const params = `username=${username}&email=${email}&password=${password}`;
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onloadend = function () {
                const response = xhr.responseText.trim();
                if (response === "ok") {
                    resolve("ok");
                } else {
                    console.log("response " + xhr.responseText);
                    reject("Sign up unsuccessful, Please try again later.");
                }
            };

            xhr.onerror = function () {
                console.log("Error during Sign up.");
                reject("Sign up failed, Please try again later.");
            };

            xhr.send(params);
        });
    }


}