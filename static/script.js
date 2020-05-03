
const wrapper = document.querySelector('main')

const loadMore = (num = 1) => {
  for (let i = 0; i < num; i++) {
    const item = document.createElement('article')
    item.innerText = wrapper.querySelectorAll('article').length + 1
    wrapper.appendChild(item)
  }
}

wrapper.addEventListener('scroll', () => {
  if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight) {
    loadMore()
  }
})

loadMore(3)
