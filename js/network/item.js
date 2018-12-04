export class Item {

    static insertDataToDB({type, description, value}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/insert.php", true);

            const params = "type=" + type + "&description=" + description +
                "&value=" + value;
       
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onloadend = function () {
                if (xhr.status === 200) {
                    //console.log("Response : ", xhr.responseText);
                    const {result, custom_id} = JSON.parse(xhr.responseText);
                    if (result === "ok") {
                        resolve(custom_id);
                    } else {
                        reject(`Http status code : ${xhr.status}`);
                    }
                }
            };
            xhr.onerror = function () {
                console.log("------------ insertDataToDB() on error------------");
                reject("An Error Occurred during the storing item to database, Please try again later.");
            };

            xhr.send(params);

        });
    }


    static getDataFromDB() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/display.php", true);

            const params = "getData=1";
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onloadend = function () {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    const json = xhr.responseText;
                    const {data} = JSON.parse(json).response;

                    if (data.length > 0) {
                        //console.log("Response getDataFromDB ", this.responseText);
                        resolve(data);
                    } else {
                        reject(`No Records found`);
                    }
                } else {
                    reject(`HTTP error Occurred, Http status code : ${this.status}`);
                }
            };

            xhr.onerror = function () {
                console.log("------------------getDataFromDB() onerror ------------------");
                reject("Error during loading item details from Database, Please try again later");
            };

            xhr.send(params);
        });
    }

    static deleteItem(id, type) {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/delete.php", true);
            const params = `customId=${id}&type=${type}`;
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onloadend = function () {
                if (this.status === 200) {
                    const {response} = JSON.parse(this.responseText);
                    if (response === "ok") {
                        resolve(response);
                    } else {
                        console.log("Item not deleted" + response);
                        reject("Item Not Deleted");
                    }

                }
            };

            xhr.onerror = () => {
                console.log("------------------deleteItem() onerror ------------------");
                reject("Item not deleted, Please try again.");
            };

            xhr.send(params);

        });

    }


}