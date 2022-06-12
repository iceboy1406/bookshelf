import BookList from './BookList.js';
import BookStore from './BookStore.js';
class Search {
    static searchInput = document.querySelector('#search-input');
    static get value() {
        if (this.searchInput !== null)
            return this.searchInput?.value;
        return '';
    }
    static get searchedBooks() {
        return (async () => await BookStore.search(this.value))();
    }
    static async renderSearchedBooks() {
        BookList.render(await this.searchedBooks, `Buku dengan judul yang mengandung kata <b>${this.value.toLowerCase()}</b> tidak ditemukan`);
    }
    static async inputChangeEventHandler() {
        this.searchInput?.addEventListener('input', async () => await this.renderSearchedBooks());
    }
    static async inputFocusEventHandler() {
        const searchInputContainer = document.querySelector('.search-input-container');
        if (searchInputContainer instanceof HTMLLabelElement &&
            this.searchInput instanceof HTMLInputElement) {
            this.searchInput.addEventListener('focus', () => searchInputContainer.classList.add('focused'));
            this.searchInput.addEventListener('blur', () => searchInputContainer.classList.remove('focused'));
        }
    }
}
export default Search;
