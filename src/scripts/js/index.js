import Shelf from './Shelf.js';
import Search from './Search.js';
import Modal from './Modal.js';
window.addEventListener('DOMContentLoaded', async () => {
    Search.inputFocusEventHandler();
    Search.inputChangeEventHandler();
    await Shelf.changeEventHandler();
    await Search.renderSearchedBooks();
});
const addBookButton = document.getElementById('add-book-button');
addBookButton.addEventListener('click', () => {
    const addBookModal = new Modal('AddBook');
    addBookModal.launch();
});
