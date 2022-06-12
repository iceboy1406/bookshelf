class BookStore {
    static getAll() {
        return new Promise((resolve, reject) => {
            try {
                const currentBooks = localStorage.getItem('books');
                const books = currentBooks == null ? [] : JSON.parse(currentBooks);
                resolve(books);
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static getOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await this.getAll();
                const index = books.findIndex((value) => value.id === id);
                if (index === -1)
                    reject('Buku tidak ditemukan');
                resolve({ data: books[index], index });
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static getUnfinishedRead(books) {
        return new Promise(async (resolve, reject) => {
            try {
                const unfinishedBooks = books.filter((value) => value.isComplete === false);
                resolve(unfinishedBooks);
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static getFinishedRead(books) {
        return new Promise(async (resolve, reject) => {
            try {
                const unfinishedBooks = books.filter((value) => value.isComplete === true);
                resolve(unfinishedBooks);
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static search(title) {
        return new Promise(async (resolve, reject) => {
            try {
                const allBooks = await this.getAll();
                const searchRegex = new RegExp(title.trim(), 'gi');
                const searchedBooks = allBooks.filter((value) => value.title.match(searchRegex));
                if (title.length > 0) {
                    resolve(searchedBooks);
                }
                else {
                    resolve(allBooks);
                }
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static moveBookToUnfinishedShelf(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await this.getAll();
                const searchedBook = await this.getOne(id);
                if (searchedBook.data.isComplete === true) {
                    reject(`Buku ${searchedBook.data.title} sudah berada di rak belum selesai dibaca`);
                }
                else {
                    searchedBook.data.isComplete = false;
                    books.splice(searchedBook.index, 1, searchedBook.data);
                    resolve(`Berhasil memindahkan buku ${searchedBook.data.title} ke rak belum selesai dibaca`);
                }
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static moveBookToFinishedShelf(id) {
        return new Promise(async (resolve, reject) => {
            const books = await this.getAll();
            const searchedBook = await this.getOne(id);
            try {
                if (searchedBook.data.isComplete === false) {
                    reject(`Buku ${searchedBook.data.title} sudah berada di rak selesai dibaca`);
                }
                else {
                    searchedBook.data.isComplete = true;
                    books.splice(searchedBook.index, 1, searchedBook.data);
                    resolve(`Berhasil memindahkan buku ${searchedBook.data.title} ke rak selesai dibaca`);
                }
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static add(book) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await this.getAll();
                if (books.findIndex((value) => value.author === book.author &&
                    value.title === book.title &&
                    value.year === book.year) !== -1) {
                    reject(`Buku ${book.title} karya ${book.author} dan terbit tahun ${book.year} sudah ada di rak. Tidak bisa diduplikat.`);
                }
                else {
                    books.push(book);
                    localStorage.setItem('books', JSON.stringify(books));
                    resolve(`Berhasil menambahkan buku ${book.title}`);
                }
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await this.getAll();
                const searchedBook = await this.getOne(id);
                books.splice(searchedBook.index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                resolve(`Berhasil menghapus buku ${searchedBook.data.title} dari rak`);
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
    static update(id, newBook) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await this.getAll();
                const searchedBook = await this.getOne(id);
                books.splice(searchedBook.index, 1, newBook);
                localStorage.setItem('books', JSON.stringify(books));
                resolve(`Berhasil mengubah data buku ${searchedBook.data.title}`);
            }
            catch (error) {
                if (error instanceof Error)
                    reject(error.message);
            }
        });
    }
}
export default BookStore;
