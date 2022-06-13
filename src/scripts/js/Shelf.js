import Search from './Search.js';
class Shelf {
    static get type() {
        return {
            unfinishedRead: 'unfinished-read',
            finishedRead: 'finished-read',
        };
    }
    static changeEventHandler() {
        const shelfSelectors = document.querySelectorAll('[name=shelf-selector]');
        for (const shelfSelector of shelfSelectors) {
            shelfSelector.addEventListener('change', () => Search.renderSearchedBooks());
        }
    }
    static get selected() {
        const selectedShelf = document.querySelector('[name=shelf-selector]:checked');
        return selectedShelf?.id;
    }
}
export default Shelf;
