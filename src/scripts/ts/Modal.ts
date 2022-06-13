import Alert from './Alert.js'
import BookStore, { Book } from './BookStore.js'
import Search from './Search.js'
import Shelf from './Shelf.js'

class Modal {
  #modalContainer = document.getElementById('modal-container') as HTMLDivElement
  #form: HTMLFormElement | null
  #cancelButton: HTMLButtonElement | null
  #titleField: HTMLInputElement | null
  #authorField: HTMLInputElement | null
  #yearField: HTMLInputElement | null
  #finishedReadCheckbox: HTMLInputElement | null
  #name: string
  #id?: number
  constructor(
    name: 'AddBook' | 'EditBook' | 'DeleteConfirmation' | 'MarkConfirmation',
    id?: number
  ) {
    this.#name = name
    this.#id = id
    this.#init()
    this.#cancelButton = this.#modalContainer.querySelector(
      'button#cancel-button'
    )
    this.#form = this.#modalContainer.querySelector('form')
    this.#titleField = this.#modalContainer.querySelector('#title-field')
    this.#authorField = this.#modalContainer.querySelector('#author-field')
    this.#yearField = this.#modalContainer.querySelector('#year-field')
    this.#finishedReadCheckbox = this.#modalContainer.querySelector(
      '#finished-read-checkbox'
    )
  }
  #init() {
    switch (this.#name) {
      case 'AddBook':
        this.#initAddBookModal()
        break
      case 'EditBook':
        this.#initEditBookModal()
        break
      case 'DeleteConfirmation':
        this.#initDeleteConfirmationModal()
        break
      case 'MarkConfirmation':
        this.#initMarkConfirmationModal()
    }
  }

  launch() {
    this.#modalContainer?.classList.remove('hidden')
    this.#hideEventHandler()
    this.#autofocusHandler()
    this.#formSubmitEventHandler()
  }

  hide() {
    this.#modalContainer?.classList.add('hidden')
  }

  #hideEventHandler() {
    this.#modalContainer?.addEventListener('click', (e) => {
      if (e.target === this.#modalContainer) this.hide()
    })
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide()
      }
    })

    this.#cancelButton?.addEventListener('click', () => this.hide())
  }

  #autofocusHandler() {
    switch (this.#name) {
      case 'AddBook':
        this.#titleField?.focus()
        break
      case 'EditBook':
        this.#titleField?.focus()
        break
    }
  }

  #formSubmitEventHandler() {
    this.#form?.addEventListener('submit', (e) => {
      switch (this.#name) {
        case 'AddBook':
          this.#addBookModalActionHandler()
          break
        case 'EditBook':
          this.#editBookModalActionHandler()
          break
        case 'DeleteConfirmation':
          this.#deleteConfirmationModalActionHandler()
          break
        case 'MarkConfirmation':
          this.#markConfirmationModalActionHandler()
      }
      e.preventDefault()
      Search.renderSearchedBooks()
      this.hide()
    })
  }

  #initEditBookModal() {
    if (this.#id) {
      const currentBook = BookStore.findById(this.#id).data
      this.#modalContainer.innerHTML = `
      <div class="modal add-book">
      <h1 class="title">Tambah Buku</h1>
      <form>
        <div class="input-group">
          <label for="title-field">Judul</label>
          <input type="text" id="title-field" placeholder="Masukan judul buku" value="${
            currentBook.title
          }" required autofocus>
        </div>
        <div class="input-group">
          <label for="author-field">Penulis</label>
          <input type="text" id="author-field" placeholder="Masukan penulis buku" value="${
            currentBook.author
          }" required>
        </div>
        <div class="input-group">
          <label for="year-field">Tahun Terbit</label>
          <input type="number" id="year-field" placeholder="Masukan tahun terbit buku" value="${
            currentBook.year
          }" required>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" name="finished-read" id="finished-read-checkbox" ${
              currentBook.isComplete ? 'checked' : ''
            }>
            <div class="checkbox">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </label>
          <label for="finished-read-checkbox" class="checkbox-label">Selesai Dibaca</label>
        </div>
        <button class="button button-primary" type="submit">Simpan</button>
        <button class="button button-secondary" id="cancel-button" type="button">Batal</button>
        </form>
    </div>
    `
    }
  }
  #initAddBookModal() {
    this.#modalContainer.innerHTML = `
      <div class="modal add-book">
      <h1 class="title">Tambah Buku</h1>
      <form>
        <div class="input-group">
          <label for="title-field">Judul</label>
          <input type="text" id="title-field" placeholder="Masukan judul buku" required autofocus>
        </div>
        <div class="input-group">
          <label for="author-field">Penulis</label>
          <input type="text" id="author-field" placeholder="Masukan penulis buku" required>
        </div>
        <div class="input-group">
          <label for="year-field">Tahun Terbit</label>
          <input type="number" id="year-field" placeholder="Masukan tahun terbit buku" required>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" name="finished-read" id="finished-read-checkbox">
            <div class="checkbox">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </label>
          <label for="finished-read-checkbox" class="checkbox-label">Selesai Dibaca</label>
        </div>
        <button class="button button-primary" type="submit">Simpan</button>
        <button class="button button-secondary" id="cancel-button" type="button">Batal</button>
        </form>
    </div>
    `
  }
  #initDeleteConfirmationModal() {
    if (this.#id) {
      const bookTitle = BookStore.findById(this.#id).data.title
      this.#modalContainer.innerHTML = `
      <div class="modal delete-confirmation">
        <h1 class="message">Apakah anda yakin ingin menghapus buku ${bookTitle}?</h1>
        <form>
          <button class="button button-secondary" id="cancel-button" type="button">Batal</button>
          <button class="button button-danger" type="submit">Yakin</button>
        </form>
      </div>
      `
    }
  }
  #initMarkConfirmationModal() {
    if (this.#id) {
      const book = BookStore.findById(this.#id).data
      this.#modalContainer.innerHTML = `
      <div class="modal mark-confirmation">
        <h1 class="message">Apakah anda yakin ingin memindahkan buku ${
          book.title
        } ke rak ${
        book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'
      }?</h1>
        <form>
          <button class="button button-secondary" id="cancel-button" type="button">Batal</button>
          <button class="button button-primary" type="submit">Yakin</button>
        </form>
      </div>
      `
    }
  }

  #addBookModalActionHandler() {
    try {
      if (
        this.#titleField &&
        this.#authorField &&
        this.#yearField &&
        this.#finishedReadCheckbox
      ) {
        const newBook: Book = {
          id: +new Date(),
          title: this.#titleField.value,
          author: this.#authorField.value,
          year: parseInt(this.#yearField.value),
          isComplete: this.#finishedReadCheckbox.checked,
        }
        const response = BookStore.add(newBook)
        const successAlert = new Alert('success', response)
        successAlert.launch()
      } else {
        throw Error('Fields null or undefined, check again')
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert('danger', error.message)
        errorAlert.launch()
      }
    }
  }
  #editBookModalActionHandler() {
    try {
      if (
        this.#titleField &&
        this.#authorField &&
        this.#yearField &&
        this.#finishedReadCheckbox
      ) {
        const newBook: Book = {
          id: +new Date(),
          title: this.#titleField.value,
          author: this.#authorField.value,
          year: parseInt(this.#yearField.value),
          isComplete: this.#finishedReadCheckbox.checked,
        }
        if (this.#id) {
          const response = BookStore.update(this.#id, newBook)
          const successAlert = new Alert('success', response)
          successAlert.launch()
        }
      } else {
        throw Error('Fields null or undefined, check again')
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert('danger', error.message)
        errorAlert.launch()
      }
    }
  }

  #deleteConfirmationModalActionHandler() {
    try {
      if (this.#id) {
        const response = BookStore.delete(this.#id)
        const successAlert = new Alert('success', response)
        successAlert.launch()
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert('danger', error.message)
        errorAlert.launch()
      }
    }
  }
  #markConfirmationModalActionHandler() {
    try {
      if (this.#id) {
        const bookIsComplete = BookStore.findById(this.#id).data.isComplete
        const response = bookIsComplete
          ? BookStore.moveBookToUnfinishedShelf(this.#id)
          : BookStore.moveBookToFinishedShelf(this.#id)
        const successAlert = new Alert('success', response)
        successAlert.launch()
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert('danger', error.message)
        errorAlert.launch()
      }
    }
  }
}

export default Modal
