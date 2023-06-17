class Book {
  title: string;
  author: string;
  pages: number;
  read: boolean;

  constructor(title: string, author: string, pages: number, read: boolean) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  books: Array<Book>;

  constructor() {
    this.books = [];
  }

  addBook(newBook: Book) {
    if (this.books.filter((book) => book.title == newBook.title).length == 0) {
      this.books.push(newBook);
    }
  }

  removeBook(title: string) {
    this.books = this.books.filter((book) => book.title != title);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("read");
const submitButton = document.getElementById("submit");
const booksDiv = document.getElementById("books");

const library = new Library();

const resetBooksDiv = () => {
  booksDiv!.innerHTML = "";
}

const removeBook = (title: string) => {
  return () => {
    const book = document.querySelector(`[title="${title}"]`);
    book!.remove();
    library.removeBook(title);
  }
}

const drawBook = (book: Book) => {
  const bookDiv = document.createElement("div");
  const line1 = document.createElement("div");
  const line2 = document.createElement("div");
  const deleteButton = document.createElement("button");
  line1.classList.add("line");
  line2.classList.add("line");

  const bookTitle = document.createElement("p");
  bookTitle.innerText = book.title + ", ";
  bookTitle.style.fontStyle = "italic";
  line1.appendChild(bookTitle);
  
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = book.author;
  line1.appendChild(bookAuthor);
  
  const bookPages = document.createElement("p");
  bookPages.innerText = book.pages + " pages";
  line2.appendChild(bookPages);
  
  if (book.read) {
    bookDiv.style.backgroundColor = "lightgreen";
  }
  
  deleteButton.innerText = "X";
  deleteButton.classList.add("delete_button");
  bookDiv.setAttribute("title", book.title);
  deleteButton.onclick = removeBook(book.title);

  bookDiv.classList.add("book");
  bookDiv.appendChild(deleteButton);
  bookDiv.appendChild(line1);
  bookDiv.appendChild(line2);
  booksDiv!.appendChild(bookDiv);
}

const updateBooksDiv = () => {
  resetBooksDiv();
  library.books.slice().reverse().forEach(book => {
    drawBook(book);
  });
}

const addBook = () => {
  const book: Book = new Book((<HTMLInputElement>titleInput).value, 
                              (<HTMLInputElement>authorInput).value, 
                              Number((<HTMLInputElement>pagesInput).value), 
                              (<HTMLInputElement>readCheckbox).checked);
  library.addBook(book);
  updateBooksDiv();
}

submitButton!.onclick = addBook;