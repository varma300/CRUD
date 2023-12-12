var selectedraw = null;
function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedraw == null) {
        inserNewRecord(formData)
    } else {
        udateRecord(formData);
    }
    resetForm();
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
    cell5.innerHTML = `<button onclick='onEdit(this)'>Edit</button> <button onclick='onDelete(this)'>Delete</button>`
}


//Edit data
function onEdit(td){
    selectedraw = td.parentElement.parentElement;
    document.getElementById('productCode').value = selectedRow.cells[0].innerHTML;
    document.getElementById('productName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('productQty').value = selectedRow.cells[2].innerHTML;
    document.getElementById('price').value = selectedRow.cells[3].innerHTML;

}

function udateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.productName;
    selectedRow.cells[2].innerHTML = formData.productQty;
    selectedRow.cells[3].innerHTML = formData.price;
}


//delet data
function onDelet(td){
    if(confirm('Do you want to dele the record ??')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex); 

    }
    resetForm();
}

// Reset the data

function resetForm(){
    document.getElementById('productCode').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productQty').value = '';
    document.getElementById('price').value ='';
}