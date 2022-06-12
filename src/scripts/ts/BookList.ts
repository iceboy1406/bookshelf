import BookStore, { Book } from './BookStore.js'
import Shelf from './Shelf.js'

class BookList {
  static async actionHandler() {
    const bookList = document.querySelector('.book-list')
    const bookListItems = bookList?.querySelectorAll('.book-list-item')
  }
  static async render(books: Book[], zeroBookMessage: string) {
    const filteredBooks =
      Shelf.selectedShelf == Shelf.type.finishedRead
        ? await BookStore.getFinishedRead(books)
        : await BookStore.getUnfinishedRead(books)
    const allBooksFromActiveShelf =
      Shelf.selectedShelf == Shelf.type.finishedRead
        ? await BookStore.getFinishedRead(await BookStore.getAll())
        : await BookStore.getUnfinishedRead(await BookStore.getAll())
    const bookList = document.querySelector('.book-list')
    if (bookList !== null) {
      bookList.innerHTML = ''
      if (filteredBooks.length === 0) {
        bookList.classList.add('no-book')
        bookList.innerHTML = `<p class="message">${
          allBooksFromActiveShelf.length > 0
            ? zeroBookMessage
            : 'Tidak ada buku'
        } di rak ${
          Shelf.selectedShelf === Shelf.type.finishedRead
            ? 'Selesai Dibaca'
            : 'Belum Selesai Dibaca'
        }</p>`
      } else {
        bookList.classList.remove('no-book')
        filteredBooks.forEach((book) => {
          bookList.innerHTML += `
          <li class="book-list-item" data-id="${book.id}">
            <div class="info">
                <h1 class="title">${book.title}</h1>
                <p class="author">Penulis : ${book.author}</p>
                <p class="published-year">Tahun terbit : ${book.year}</p>
            </div>
            <div class="actions">
                <button class="icon-button button-primary edit-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M7.33334 2.66667H2.66668C2.31305 2.66667 1.97392 2.80714 1.72387 3.05719C1.47382 3.30724 1.33334 3.64638 1.33334 4V13.3333C1.33334 13.687 1.47382 14.0261 1.72387 14.2761C1.97392 14.5262 2.31305 14.6667 2.66668 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V8.66667"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                    d="M12.3333 1.66667C12.5986 1.40145 12.9583 1.25245 13.3333 1.25245C13.7084 1.25245 14.0681 1.40145 14.3333 1.66667C14.5986 1.93188 14.7476 2.29159 14.7476 2.66667C14.7476 3.04174 14.5986 3.40145 14.3333 3.66667L8.00001 10L5.33334 10.6667L6.00001 8L12.3333 1.66667Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <button class="icon-button button-danger delete-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4H3.33333H14" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                    d="M5.33334 4V2.66667C5.33334 2.31304 5.47382 1.9739 5.72387 1.72386C5.97392 1.47381 6.31305 1.33333 6.66668 1.33333H9.33334C9.68697 1.33333 10.0261 1.47381 10.2762 1.72386C10.5262 1.9739 10.6667 2.31304 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2762 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66668C4.31305 14.6667 3.97392 14.5262 3.72387 14.2761C3.47382 14.0261 3.33334 13.687 3.33334 13.3333V4H12.6667Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.66666 7.33333V11.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.33334 7.33333V11.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <button class="button button-success mark-button">${
                  book.isComplete
                    ? 'Tandai Belum Selesai Dibaca'
                    : 'Tandai Selesai Dibaca'
                }</button>
            </div>
          </li>
                    `
        })
      }
    }
  }
}
export default BookList
