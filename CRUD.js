var selectedraw = null;
function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedraw == null) {
        inserNewRecord(formData)
    } else {

    }

}

//retrive the data
function readFormData() {
    var formData = {};
    formData['productCode'] = document.getElementById('productCode').value;
    formData['productName'] = document.getElementById('productName').value;
    formData['productQty'] = document.getElementById('productQty').value;
    formData['price'] = document.getElementById('price').value;
    return formData

}


// insert the data

function inserNewRecord(data) {
    var table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    var newRaw = table.insertRow(table.length);
    var cell1 = newRaw.insertCell(0);
    cell1.innerHTML = data.productCode;
    var cell2 = newRaw.insertCell(1);
    cell2.innerHTML = data.productName;
    var cell3 = newRaw.insertCell(2);
    cell3.innerHTML = data.productQty;
    var cell4 = newRaw.insertCell(3);
    cell4.innerHTML = data.price;
    var cell5 = newRaw.insertCell(4);
    cell5.innerHTML = `<button>Edit</button> <button>Delete</button>`
}