
const Utils = {

  /**
   * get effective document height from one of the potential values
   */
  getDocumentHeight: () => {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
  },

  /**
   * get scroll position in a cross-browser manner
   * @returns {Array} position current scroll position as (x, y)
   */
  getScrollPosition: () => {
    let screenOffsetX = 0
    let screenOffsetY = 0

    if (typeof(window.pageYOffset) === 'number') {
      // Netscape compliant
      screenOffsetY = window.pageYOffset
      screenOffsetX = window.pageXOffset
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
      // DOM compliant
      screenOffsetY = document.body.scrollTop
      screenOffsetX = document.body.scrollLeft
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
      // IE6 standards compliant mode
      screenOffsetY = document.documentElement.scrollTop
      screenOffsetX = document.documentElement.scrollLeft
    }

    return [screenOffsetX, screenOffsetY]
  }

}
