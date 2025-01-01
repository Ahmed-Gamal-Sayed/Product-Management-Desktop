// get input element.
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads   = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const search = document.getElementById('search');

// get button element.
const btnCreate = document.getElementById('btn-create');
const btnSearchTitle = document.getElementById('btn-search-title');
const btnSearchCategory = document.getElementById('btn-search-category');
const btnDeleteAll = document.getElementById('btn-delete-all');
const btnUpdate = document.getElementById('btn-update');
const btnDelete = document.getElementById('btn-delete');

// global variables
let mode = true;
let tmp;

// functions.

function getTotal() {
    let result = 0;
    if (price.value != '') {
        result += +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = '#01ea31';
    } else {
        total.innerHTML = '';
        total.style.background = '#78211b';
    }
}

price.addEventListener('keyup', () => {
    getTotal()
})

taxes.addEventListener('keyup', () => {
    getTotal()
})

ads.addEventListener('keyup', () => {
    getTotal()
})

discount.addEventListener('keyup', () => {
    getTotal()
})



// Clean Inputs From Data
function cleanInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value   = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}


// Check localStorage & array is null.
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

if (dataPro.length > 0) {
    btnDeleteAll.style.display = 'block';
    btnDeleteAll.innerHTML = `Delete All (${dataPro.length})`;
} else {
    btnDeleteAll.style.display = 'none';
}

// Create Product
btnCreate.addEventListener('click', () => {
    if (
        (title.value != '') &
        (price.value != '') &
        (category.value != '')
    ) {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value,
        };

        if (mode) {
            let cnt = +count.value;
            if ((cnt > 1) & (cnt < 100)) {
                for (let i = 0; i < cnt; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            btnCreate.innerHTML = 'Create';
            count.style.display = 'block';
            total.style.backgroundColor = '#78211b';
            mode = true;
        }

        localStorage.setItem('product', JSON.stringify(dataPro));
        cleanInputs()
        ShowData()
    
        btnDeleteAll.style.display = 'block';
        btnDeleteAll.innerHTML = `Delete All (${dataPro.length})`;
    }
})


// Show Data OR Read Products
function ShowData() {
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button class="btn-update" onClick="UpdateData(${i})" id="btn-update">update</button></td>
                        <td><button class="btn-delete" onClick="DeleteData(${i})" id="btn-delete">delete</button></td>
            </tr>
        `;
    }


    document.getElementById('tbody').innerHTML = table;
}

ShowData()

// delete one product
function DeleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    ShowData();
}


// Update Product
function UpdateData(i) {
    title.value     = dataPro[i].title;
    price.value     = dataPro[i].price;
    taxes.value     = dataPro[i].taxes;
    ads.value       = dataPro[i].ads;
    discount.value  = dataPro[i].discount;
    category.value  = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    btnCreate.innerHTML = 'Update';
    mode = false;
    tmp = i;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}



// delete all products
btnDeleteAll.addEventListener('click', () => {
    localStorage.clear();
    dataPro.splice(0);
    btnDeleteAll.style.display = 'none';
    ShowData();
})

// search product
btnSearchTitle.addEventListener('click', () => {
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        if (search.value === dataPro[i].title) {
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button class="btn-update" id="btn-update">update</button></td>
                <td><button class="btn-delete" id="btn-delete">delete</button></td>
            </tr>
        `;
        }
    }


    document.getElementById('tbody').innerHTML = table;
})

btnSearchCategory.addEventListener('click', () => {
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        if (search.value === dataPro[i].category) {
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button class="btn-update" id="btn-update">update</button></td>
                <td><button class="btn-delete" id="btn-delete">delete</button></td>
            </tr>
        `;
        }
    }


    document.getElementById('tbody').innerHTML = table;
})

