export class LoginProcess {
    static login(email,password){
        return new Promise((resolve,reject)=>{

            const xhr = new XMLHttpRequest();

            xhr.open("POST", "php/login.php", true);
            const params = `email=${email}&password=${password}`;

            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onloadend = function () {
                const response = this.responseText.trim();
                console.log("response " + response);
                if (response === "ok") {
                    resolve();
                } else {
                    reject("Email or Password wrong!!!!");
                }
            };

            xhr.onerror = function () {
                reject("Login Failed");
            };

            xhr.send(params);

        })
    }
}