const bodyEl = document.body
const getComputedStyle = window.getComputedStyle

export const offset = element => {
  const rect = element.getBoundingClientRect()

  return {
    top: rect.top + bodyEl.scrollTop,
    left: rect.left + bodyEl.scrollLeft
  }
}

export const shape = element => {
  const computedStyle = getComputedStyle(element)
  return {
    width: parseFloat(computedStyle.width),
    height: parseFloat(computedStyle.height)
  }
}

/**
 * Inspired by https://codepen.io/daveboling/pen/jWOorz
 */
export const distance = (x, y, x0, y0) =>
  Math.sqrt((x -= x0) * x + (y -= y0) * y)

export const angle = (x, y, x0, y0) =>
  Math.atan2(y0 - y, x0 - x) * 180 / Math.PI
