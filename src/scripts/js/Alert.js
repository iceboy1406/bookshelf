class Alert {
    #theme;
    #message;
    #alertContainer = document.getElementById('alert-container');
    #closeButton;
    constructor(theme, message) {
        this.#theme = theme;
        this.#message = message;
        this.#init();
        this.#closeButton = this.#alertContainer?.querySelector('button.close-button');
        this.#closeButton?.addEventListener('click', () => this.hide());
    }
    #init() {
        if (this.#alertContainer) {
            this.#alertContainer.innerHTML = `
      <div class="alert alert-${this.#theme}">
        <p class="message">${this.#message}</p>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
          viewBox="0 0 16 16">
            <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
        `;
        }
    }
    launch() {
        if (this.#alertContainer) {
            this.#alertContainer.classList.remove('hidden');
        }
    }
    hide() {
        if (this.#alertContainer) {
            this.#alertContainer.classList.add('hidden');
        }
    }
}
export default Alert;
