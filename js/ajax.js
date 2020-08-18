function getTeddies() {
    return new Promise(function (resolve) {
        var teddies = new XMLHttpRequest();
        teddies.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response)
            }
        }
        teddies.open("GET", "https://oc-p5-api.herokuapp.com/api/teddies/");
        teddies.send();

    })

}

function getTeddy(id) {
    return new Promise(function (resolve) {
        var teddies = new XMLHttpRequest();
        teddies.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response)
            }
        }
        teddies.open("GET", "https://oc-p5-api.herokuapp.com/api/teddies/" + id);
        teddies.send();

    })

}

function postOrder(order) {
    return new Promise(function (resolve) {
        var teddies = new XMLHttpRequest();
        teddies.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                var response = JSON.parse(this.responseText);
                resolve(response)
            }
        }
        teddies.open("POST", "https://oc-p5-api.herokuapp.com/api/teddies/order");
        teddies.send(JSON.stringify(order));

    })
}

