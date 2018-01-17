export const offset = element => {
  const rect = element.getBoundingClientRect(),
    bodyEl = document.body
  return {
    top: rect.top + bodyEl.scrollTop,
    left: rect.left + bodyEl.scrollLeft
  }
}
