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

Library.prototype.removeBook = function(title) {
  this.books = this.books.filter((book) => book.title !== title)
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
const bookContainer = document.querySelector('.book-container') 

updateLibraryCards();

addBookBtn.onclick = addBook
overLay.onclick = exitModal
form.addEventListener("submit", handleSubmit)

function addBook() {
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
  library.books.forEach(element => {
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