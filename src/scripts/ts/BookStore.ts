interface Book {
  id: number
  title: string
  author: string
  year: number
  isComplete: boolean
}
interface DataBook {
  index: number
  data: Book
}
class BookStore {
  static getAll(): Book[] {
    const currentBooks = localStorage.getItem('books')
    return currentBooks == null ? [] : JSON.parse(currentBooks)
  }
  static findById(id: number): DataBook {
    const currentBooks: Book[] = this.getAll()
    const index = currentBooks.findIndex((book) => book.id === id)
    if (index === -1) throw Error('Buku tidak ditemukan')
    return { data: currentBooks[index], index }
  }
  static findByTitle(title: string): Book[] {
    const currentBooks = this.getAll()
    const searchedBooks = currentBooks.filter((value) =>
      value.title.match(new RegExp(title.trim(), 'gi'))
    )
    if (title.trim().length > 0) return searchedBooks
    return currentBooks
  }

  static filterUnfinishedRead(books: Book[]) {
    return books.filter((book) => book.isComplete === false)
  }
  static filterFinishedRead(books: Book[]) {
    return books.filter((book) => book.isComplete === true)
  }
  static moveBookToUnfinishedShelf(id: number): string {
    const currentBooks: Book[] = this.getAll()
    const searchedBook = this.findById(id)
    if (searchedBook.data.isComplete === false) {
      throw Error(
        `Buku ${searchedBook.data.title} sudah berada di rak belum selesai dibaca`
      )
    } else {
      searchedBook.data.isComplete = false
      currentBooks.splice(searchedBook.index, 1, searchedBook.data)
      localStorage.setItem('books', JSON.stringify(currentBooks))
      return `Berhasil memindahkan buku ${searchedBook.data.title} ke rak belum selesai dibaca`
    }
  }
  static moveBookToFinishedShelf(id: number): string {
    const currentBooks: Book[] = this.getAll()
    const searchedBook = this.findById(id)
    if (searchedBook.data.isComplete === true) {
      throw Error(
        `Buku ${searchedBook.data.title} sudah berada di rak selesai dibaca`
      )
    } else {
      searchedBook.data.isComplete = true
      currentBooks.splice(searchedBook.index, 1, searchedBook.data)
      localStorage.setItem('books', JSON.stringify(currentBooks))
      return `Berhasil memindahkan buku ${searchedBook.data.title} ke rak selesai dibaca`
    }
  }
  static add(newBook: Book): string {
    const currentBooks: Book[] = this.getAll()
    if (
      currentBooks.findIndex(
        (currentBook) =>
          currentBook.author === newBook.author &&
          currentBook.title === newBook.title &&
          currentBook.year === newBook.year
      ) !== -1
    ) {
      throw Error(
        `Buku ${newBook.title} karya ${newBook.author} dan terbit tahun ${newBook.year} sudah ada di rak. Tidak bisa diduplikat.`
      )
    } else {
      if (isNaN(newBook.year) || newBook.year < 1) {
        throw Error(
          `Tahun terbit harus diisi dengan angka dan harus lebih besar dari 0`
        )
      } else {
        localStorage.setItem(
          'books',
          JSON.stringify([...currentBooks, newBook])
        )
        return `Berhasil menambahkan buku ${newBook.title}`
      }
    }
  }
  static delete(id: number): string {
    const currentBooks: Book[] = this.getAll()
    const searchedBook = this.findById(id)
    currentBooks.splice(searchedBook.index, 1)
    localStorage.setItem('books', JSON.stringify(currentBooks))
    return `Berhasil menghapus buku ${searchedBook.data.title} dari rak`
  }
  static update(id: number, newBook: Book): string {
    if (isNaN(newBook.year) || newBook.year < 1) {
      throw Error(
        `Tahun terbit harus diisi dengan angka dan harus lebih besar dari 0`
      )
    } else {
      const currentBooks: Book[] = this.getAll()
      const searchedBook = this.findById(id)
      currentBooks.splice(searchedBook.index, 1, newBook)
      localStorage.setItem('books', JSON.stringify(currentBooks))
      return `Berhasil mengubah data buku ${searchedBook.data.title}`
    }
  }
}

export default BookStore
export type { DataBook as OneBook, Book }
