class Modal {
  #modalContainer = document.getElementById('modal-container')
  #cancelButton
  constructor(
    name: 'AddBook' | 'EditBook' | 'DeleteConfirmation' | 'MarkConfirmation',
    data: string | object = {}
  ) {
    switch (name) {
      case 'AddBook':
        this.#initAddBookModal()
      case 'EditBook':
        this.#initAddBookModal()
      case 'DeleteConfirmation':
        this.#initAddBookModal()
      case 'MarkConfirmation':
        this.#initAddBookModal()
    }
    this.#cancelButton = document.getElementById('cancel-button')
  }

  launch() {
    this.#modalContainer?.classList.remove('hidden')
    this.#hideEventHandler()
  }
  hide() {
    this.#modalContainer?.classList.add('hidden')
  }
  #hideEventHandler() {
    this.#modalContainer?.addEventListener('click', (e) => {
      if (e.target === this.#modalContainer) this.hide()
    })
    this.#cancelButton?.addEventListener('click', () => this.hide())
  }

  #initAddBookModal() {
    if (this.#modalContainer)
      this.#modalContainer.innerHTML = `
      <div class="modal add-book">
      <h1 class="title">Tambah Buku</h1>
      <form>
        <div class="input-group">
          <label for="title-field">Judul</label>
          <input type="text" id="title-field" placeholder="Masukan judul buku" required>
        </div>
        <div class="input-group">
          <label for="author-field">Penulis</label>
          <input type="text" id="author-field" placeholder="Masukan penulis buku" required>
        </div>
        <div class="input-group">
          <label for="year-field">Judul</label>
          <input type="text" id="year-field" placeholder="Masukan tahun terbit buku" required>
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
}
export default Modal
