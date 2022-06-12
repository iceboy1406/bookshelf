import Search from './Search.js';
class Shelf {
    static get type() {
        return {
            unfinishedRead: 'unfinished-read',
            finishedRead: 'finished-read',
        };
    }
    static async changeEventHandler() {
        const shelfSelectors = document.querySelectorAll('[name=shelf-selector]');
        for (const shelfSelector of shelfSelectors) {
            shelfSelector.addEventListener('change', async () => await Search.renderSearchedBooks());
        }
    }
    static get selectedShelf() {
        const selectedShelf = document.querySelector('[name=shelf-selector]:checked');
        if (selectedShelf instanceof HTMLInputElement)
            return selectedShelf.id;
    }
}
export default Shelf;
