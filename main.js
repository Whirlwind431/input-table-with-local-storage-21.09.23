let booksArray = []

// input fields
const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const bookPrice = document.getElementById("bookPrice");
const bookStock = document.getElementById("bookStock");

// buttons
let submitBtn = document.getElementById("submitBtn")
let saveBtn = document.getElementById("saveBtn")

// error msg
const bookNameMsgError = document.getElementById("bookNameErrorMsg");
const bookAuthorMsgError = document.getElementById("bookAuthorErrorMsg");
const bookPriceMsgError = document.getElementById("bookPriceErrorMsg");
const bookStockMsgError = document.getElementById("bookStockErrorMsg");


// no refreshing
preventdefault = function (e) {
    e.preventDefault();
}

// start our website
webInit()


function webInit() {
    if (localStorage.getItem("books")) {
        booksArray = localStorage.getItem("books")
        const strBooks = JSON.parse(booksArray)
        booksArray = strBooks
        console.log(booksArray);
    } else {
        booksArray = []
    }
    drawCards()
}


// main function
function addNewBook() {
    const newBook = addNewBookObject()
    const validation = validationFunc(newBook)
    if (validation) {
        addToLocalStorage(newBook)
        clearInputValue()
        webInit()
    }
}

// set up the new book object
function addNewBookObject() {
    newBookObj = {
        bookName: bookName.value,
        bookAuthor: bookAuthor.value,
        bookPrice: bookPrice.value,
        bookStock: bookStock.value
    }
    console.log(newBookObj);
    return newBookObj
}

// validate all the values to the new book object
function validationFunc(obj) {
    if (!obj.bookName) {
        bookNameMsgError.innerHTML = "Please enter book name";
        bookName.style.backgroundColor = "red";
    } else {
        bookNameMsgError.innerHTML = "";
        bookName.style.backgroundColor = "white";
    }

    if (!obj.bookAuthor) {
        bookAuthorMsgError.innerHTML = "Please enter book author";
        bookAuthor.style.backgroundColor = "red";
    } else {
        bookAuthorMsgError.innerHTML = "";
        bookAuthor.style.backgroundColor = "white";
    }

    if (!obj.bookPrice) {
        bookPriceMsgError.innerHTML = "Please enter book price";
        bookPrice.style.backgroundColor = "red";
    } else {
        bookPriceMsgError.innerHTML = "";
        bookPrice.style.backgroundColor = "white";
    }

    if (!obj.bookStock) {
        bookStockMsgError.innerHTML = "Please enter book stock";
        bookStock.style.backgroundColor = "red";
    } else {
        bookStockMsgError.innerHTML = "";
        bookStock.style.backgroundColor = "white";
    }

    if (!obj.bookName || !obj.bookAuthor || !obj.bookPrice || !obj.bookStock) {
        return false;
    } else {
        return true;
    }
}


// function validationFunc(obj) {


//     !obj.bookName ? (bookNameMsgError.innerHTML = "Please enter book name") && (bookName.style.backgroundColor = "red") : (bookNameMsgError.innerHTML = "") && (bookName.style.backgroundColor = "blue")
//     !obj.bookAuthor ? (bookAuthorMsgError.innerHTML = "Please enter book author") && (bookAuthor.style.backgroundColor = "red") : (bookAuthorMsgError.innerHTML = "") && (bookAuthor.style.backgroundColor = "white")
//     !obj.bookPrice ? (bookPriceMsgError.innerHTML = "Please enter book price") && (bookPrice.style.backgroundColor = "red") : (bookPriceMsgError.innerHTML = "")&& (bookPrice.style.backgroundColor = "white")
//     !obj.bookStock ? (bookStockMsgError.innerHTML = "Please enter book stock") && (bookStock.style.backgroundColor = "red") : (bookStockMsgError.innerHTML = "") && (bookStock.style.backgroundColor = "white")


//     if (!obj.bookName || !obj.bookAuthor || !obj.bookPrice || !obj.bookStock) {
//         return false;
//     } else {
//         return true;
//     }
// }


// clear input 
function clearInputValue() {
    bookName.value = ''
    bookName.style.backgroundColor = "white"
    bookAuthor.value = ''
    bookAuthor.style.backgroundColor = "white"
    bookPrice.value = ''
    bookPrice.style.backgroundColor = "white"
    bookStock.value = ''
    bookStock.style.backgroundColor = "white"
    // clear msg
    bookNameMsgError.value = ''
    bookAuthorMsgError.value = ''
    bookPriceMsgError.value = ''
    bookStockMsgError.value = ''
}

// add to LocalStorage
function addToLocalStorage(newBook) {
    booksArray.push(newBook);
    const json = JSON.stringify(booksArray);
    localStorage.setItem("books", json)
}

// drawCards
function drawCards() {
    const tBodyTable = document.getElementById("tBodyTable");
    console.log(booksArray);
    let html = ''
    for (let item of booksArray) {
        let index = booksArray.indexOf(item)
        html += `<tr class="table-primary">
        <td class="table-primary"> ${item.bookName} </td>
        <td class="table-primary"> ${item.bookAuthor} </td>
        <td class="table-primary"> ${item.bookPrice} </td>
        <td class="table-primary"> ${item.bookStock} </td>
        <td class="table-primary"> <button class="btn btn-warning" onclick="editButton(${index})">Edit</button> </td>
        <td class="table-primary"> <button class="btn btn-danger" onclick="deleteButton(${index})">Delete</button> </td>

        </tr>`
    }
    tBodyTable.innerHTML = html


}

//get our users from the local storage 
function updateBooksToLocalStorage() {
    const stringifyNewBooks = JSON.stringify(booksArray)
    localStorage.setItem("books", stringifyNewBooks)
}


function deleteButton(index) {
    booksArray.splice(index, 1)
    updateBooksToLocalStorage()
    webInit()
}

// EDIT HELL BUTTON :(
function editButton(index) {
    // clearInputValue()
    // const position = index
    const book = booksArray[index]
    submitBtn.setAttribute("hidden", "true")
    saveBtn.removeAttribute("hidden", "true")
    bookName.value = book.bookName
    bookAuthor.value = book.bookAuthor
    bookPrice.value = book.bookPrice
    bookStock.value = book.bookStock
    console.log(book );
    saveBtn.addEventListener("click", function () {
        saveBtnFunc(book)
    })
    
}

//save button
function saveBtnFunc(book) {
    book.bookName = bookName.value
    book.bookAuthor = bookAuthor.value
    book.bookPrice = bookPrice.value
    book.bookStock = bookStock.value
    if (validationFunc(book)) {
        drawCards()
        updateBooksToLocalStorage()
        saveBtn.setAttribute("hidden", "true")
        submitBtn.removeAttribute("hidden", "true")
        webInit()
    }
}
