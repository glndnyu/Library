function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead ? true : false
}

function Library() {
  if (this instanceof Library === false) {
    return new Library()
  }
  
  this.books = new Array()
}

Library.prototype.addBook = function(newBook) {
    this.books.push(newBook)
}

Library.prototype.removeBook = function(book) {
  this.books.splice(this.books.indexOf(book), 1)
}

Library.prototype.getBook = function(title) {
  return this.books.find((book) => book.title === title)
}

Library.prototype.isBookInLibrary = function(newBook) {
  return this.books.some((book) => book.title === newBook.title)
}

const library = new Library()

const theHobbit =  new Book("The Hobbit", "J.R.R. Tolkien", 295, true)

library.addBook(theHobbit)

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


addBookBtn.onclick = function() {
  form.reset()
  modal.classList.add('active')
  overLay.classList.add('active')
}

overLay.onclick = exitModal
form.addEventListener("submit", handleSubmit)

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
    exitModal();
    return
  }
  error.classList.add('active')
}

function updateLibraryCards(){
  
}