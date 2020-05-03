
// wrapper of item elements
const wrapper = document.querySelector('main')

// current position
let current = 1

// load 3 more items
const loadMore = () => {
  if (current <= config.total - 2) {
    fetch(`http://0.0.0.0:${config.port}/api/next?current=${current}`)
      .then(response => response.json())
      .then(items => {
        items.forEach(num => {
          const item = document.createElement('article')
          item.innerText = num
          wrapper.appendChild(item)
        });
        current += items.length
      })
  }
}

// add scroll event listener to wrapper
wrapper.addEventListener('scroll', () => {
  if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight) {
    loadMore()
  }
})

// start logic when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadMore()
})
