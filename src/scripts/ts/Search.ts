import BookList from './BookList.js'
import BookStore from './BookStore.js'
import Shelf from './Shelf.js'

class Search {
  static searchInput: HTMLInputElement | null =
    document.querySelector('#search-input')

  static get value() {
    if (this.searchInput !== null) return this.searchInput?.value
    return ''
  }

  static get searchedBooks() {
    switch (Shelf.selected) {
      case Shelf.type.finishedRead:
        return BookStore.filterFinishedRead(BookStore.findByTitle(this.value))
      case Shelf.type.unfinishedRead:
        return BookStore.filterUnfinishedRead(BookStore.findByTitle(this.value))
    }
  }

  static renderSearchedBooks() {
    const allBookOnActiveShelf = (() => {
      switch (Shelf.selected) {
        case Shelf.type.finishedRead:
          return BookStore.filterFinishedRead(BookStore.getAll())
        case Shelf.type.unfinishedRead:
          return BookStore.filterUnfinishedRead(BookStore.getAll())
      }
    })()
    if (this.searchedBooks && allBookOnActiveShelf) {
      const noBookMessage =
        allBookOnActiveShelf.length > 0
          ? `Buku dengan judul yang mengandung <b>${this.value.toLowerCase()}</b> tidak ditemukan`
          : `Tidak ada buku di rak ini`
      const searchedBooksList = new BookList(this?.searchedBooks, noBookMessage)
      searchedBooksList.render()
    }
  }

  static inputChangeEventHandler() {
    this.searchInput?.addEventListener('input', () =>
      this.renderSearchedBooks()
    )
  }
  static inputFocusEventHandler() {
    const searchInputContainer: HTMLElement | null | HTMLLabelElement =
      document.querySelector('.search-input-container')
    if (
      searchInputContainer instanceof HTMLLabelElement &&
      this.searchInput instanceof HTMLInputElement
    ) {
      this.searchInput.addEventListener('focus', () =>
        searchInputContainer.classList.add('focused')
      )
      this.searchInput.addEventListener('blur', () =>
        searchInputContainer.classList.remove('focused')
      )
    }
  }
}
export default Search
