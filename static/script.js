(() => {

  // wrapper of item elements
  const wrapper = document.querySelector('main')

  // current number of items
  let current = 0

  // get scroll position in a cross-browser manner
  const getScrollPosition = () => {
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

  // get effective document height from one of the potential values
  const getDocumentHeight = () => {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
  }

  // load `batch` more items
  const loadMore = () => {
    if (current <= config.total - config.batch) {
      fetch(`http://0.0.0.0:${config.port}/api/next?last=${current}`)
        .then(response => response.json())
        .then(items => {
          items.forEach(num => {
            const item = document.createElement('article')
            item.innerText = num
            wrapper.appendChild(item)
          });
          current += config.batch
        })
    }
  }

  // add scroll event listener to wrapper
  document.addEventListener('scroll', () => {
    if (getDocumentHeight() == getScrollPosition()[1] + window.innerHeight) {
      loadMore()
    }
  })

  // start logic when DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    loadMore()
  })

})()
