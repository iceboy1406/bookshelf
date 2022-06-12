const launchAlert = (message: string, theme: 'success' | 'danger') => {
  const messageWordCount = message.split(' ').length
  const alert: HTMLDivElement | null = document.querySelector('.alert')
  if (alert !== null) {
    const hideAlert = () => alert.classList.add('hidden')
    const showAlert = () => alert.classList.remove('hidden')
    const messageParagraph: HTMLParagraphElement | null =
      alert.querySelector('.message')
    const closeButton: HTMLButtonElement | null =
      alert.querySelector('.close-button')

    alert.setAttribute('data-theme', theme)
    if (messageParagraph !== null) messageParagraph.innerHTML = message
    showAlert()

    const closeCountDown = setTimeout(
      hideAlert,
      Math.max((messageWordCount / 250) * 60 * 1000, 5000)
    )
    if (closeButton !== null)
      closeButton.addEventListener('click', () => {
        hideAlert()
        clearTimeout(closeCountDown)
      })
  }
}
export default launchAlert
