class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead ? true : false
    }
}

class Library {
    #books;
    constructor() {
          this.#books = new Array()
    }
    addBook(newBook) {
        this.#books.push(newBook)
    }

    removeBook(title) {
        this.#books = this.#books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.#books.find((book) => book.title === title)
    }

    getBooks() {
        return this.#books
    }

    isBookInLibrary(newBook) {
        return this.#books.some((book) => book.title === newBook.title)
    }
}

const library = new Library()

const theHobbit =  new Book("The Hobbit", "J.R.R. Tolkien", 295, true)
const lotr = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1945, false)

library.addBook(theHobbit)
library.addBook(lotr)

//User interface

const addBookBtn = document.getElementById('add-book')
const modal = document.getElementById('myModal')
const overLay = document.getElementById('overlay')
const saveBook = document.querySelector('.button-submit')
const form = document.querySelector(".feed-form")
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const read = document.getElementById('read') 
const error = document.querySelector('.error-msg')
const bookContainer = document.querySelector('.book-container') 



updateLibraryCards();

addBookBtn.onclick = addBook
overLay.onclick = exitModal
form.addEventListener("submit", handleSubmit)

function addBook(e) {
    e.stopPropagation();
    form.reset()
    modal.classList.add('active')
    overLay.classList.add('active')
}

function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    const newBook = new Book(...Object.values(formProps))
    checkBook(newBook)
    updateLibraryCards();  
}

function exitModal() {
    modal.classList.remove('active')
    overLay.classList.remove('active')
    error.classList.remove('active')
}  

function checkBook(newBook){
    if(!library.isBookInLibrary(newBook)){
        library.addBook(newBook)
        exitModal()
        return
    }
    error.classList.add('active')
}

function updateLibraryCards(){
    clearLibrary()
    library.getBooks().forEach(element => {
        createBookCard(element)
    })
    toggleListener()
}

function clearLibrary() {
    while (bookContainer.lastChild)
        bookContainer.removeChild(bookContainer.lastChild)
}

function createBookCard(element){
    const bookCard = document.createElement('div')
    const deleteBookButton = document.createElement('button')
    const readBookButton = document.createElement('button')
    let title;
    Object.keys(element).forEach((key) => {
        if(key !== 'isRead'){
        const para = document.createElement('p')
        para.appendChild(document.createTextNode(element[key]))
        if(key === 'title'){
            para.classList.add('heading')
            title = element[key];
        }
        if(key === 'pages')
            para.appendChild(document.createTextNode(" pages"))
        bookCard.appendChild(para)
        }
        else {
        readBookButton.appendChild(document.createTextNode(element[key] ? 'Read' : 'Not Read'))
        readBookButton.classList.add('readBookButton')
        readBookButton.dataset.title = title;
        bookCard.appendChild(readBookButton)
        }
    })

    deleteBookButton.appendChild(document.createTextNode('Delete'))
    deleteBookButton.classList.add('deleteBookButton')
    deleteBookButton.dataset.title = title;
    bookCard.appendChild(deleteBookButton)
    bookCard.classList.add('card')

    bookContainer.appendChild(bookCard)
}

function toggleListener() {
    const deleteButton = document.querySelectorAll('.deleteBookButton')
    const readButton = document.querySelectorAll('.readBookButton')
    deleteButton.forEach(button => button.addEventListener('click', deleteBook))
    readButton.forEach(button => button.addEventListener('click', toggleRead))
}

function deleteBook(e) {
    console.log(e.target.dataset.title)
    library.removeBook(e.target.dataset.title)
    updateLibraryCards()
}

function toggleRead(e) {
    let read = library.getBook(e.target.dataset.title)
    if(read.isRead) {
        e.target.innerHTML = 'Not Read'
        read.isRead = false
    }
    else {
        e.target.innerHTML = 'Read'
        read.isRead = true
    }
}

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    // use an aria-label if you are omitting text on the button
    // and using a sun/moon icon, for example
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}


/**
* On page load:
*/

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
}); 