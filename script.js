function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function Library() {
  if (this instanceof Library === false) {
    return new Library()
  }
  
  this.books = new Array();
}

Library.prototype.addBook = function(newBook) {
  if(!this.isBookInLibrary(newBook))
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

const library = new Library();

const theHobbit =  new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

library.addBook(theHobbit);

//User interface

const addBookBtn = document.getElementById('add-book');
const modal = document.getElementById('myModal');
const overLay = document.getElementById('overlay')
const saveBook = document.querySelector('.button-submit')

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
addBookBtn.onclick = function() {
  modal.style.display = "flex";
  overLay.classList.add('active');
}

// When the user clicks anywhere outside of the modal, close it
overlay.onclick = function(event) {
    modal.style.display = "none";
    overLay.classList.remove('active');
  }