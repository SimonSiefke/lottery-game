const s = document.createElement('style')
document.getElementsByTagName('head')[0].appendChild(s)
window.addEventListener('mousedown', () =>
  document.body.classList.remove('Keyboard'),
)
window.addEventListener('keydown', (event) =>
  document.body.classList.add('Keyboard'),
)
