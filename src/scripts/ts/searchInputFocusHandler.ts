const searchInputFocusHandler = () => {
  const searchInputContainer: HTMLElement | null | HTMLLabelElement =
    document.querySelector('.search-input-container')
  const searchInput: HTMLInputElement | null | undefined | HTMLElement =
    searchInputContainer?.querySelector('#search-input')
  if (
    searchInputContainer instanceof HTMLLabelElement &&
    searchInput instanceof HTMLInputElement
  ) {
    searchInput.addEventListener('focus', () =>
      searchInputContainer.classList.add('focused')
    )
    searchInput.addEventListener('blur', () =>
      searchInputContainer.classList.remove('focused')
    )
  }
}
export default searchInputFocusHandler
