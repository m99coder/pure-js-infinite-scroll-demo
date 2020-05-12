(() => {

  // wrapper of item elements
  const wrapper = document.querySelector('main')

  // state representing current number of items and scroll top position
  let state = {
    items: 0,
    scrollTop: 0
  }

  // load from session storage if existing or persist defaults
  Object.keys(state).forEach(key => {
    if (sessionStorage.getItem(`state.${key}`)) {
      state[key] = sessionStorage.getItem(`state.${key}`) - 0
    } else {
      sessionStorage.setItem(`state.${key}`, state[key])
    }
  })

  // persist current state in session storage
  const persistState = () => {
    Object.keys(state).forEach(key => {
      sessionStorage.setItem(`state.${key}`, state[key])
    })
  }

  // return a promise and load `batch` more items if applicable
  const loadMore = async (last) => {
    return new Promise(
      resolve => {
        if (last <= config.total - config.batch) {
          fetch(`http://0.0.0.0:${config.port}/api/next?last=${last}`)
            .then(response => response.json())
            .then(items => {
              items.forEach(num => {
                const item = document.createElement('article')
                item.innerText = num
                wrapper.appendChild(item)
              });
              resolve()
            })
        } else {
          resolve()
        }
      }
    )
  }

  // add scroll event listener to wrapper
  document.addEventListener('scroll', async () => {

    // update current scroll top position in `state`
    const position = Utils.getScrollPosition()
    state.scrollTop = position[1]
    persistState()

    // check if bottom of page is reached and trigger loading more items
    if (Utils.getDocumentHeight() === position[1] + window.innerHeight) {
      await loadMore(state.items + config.batch).then(() => {
        persistState()
        state.items += config.batch
      })
    }

  })

  // start logic when DOM content is loaded
  document.addEventListener('DOMContentLoaded', async () => {

    // calculate number of calls to trigger initially
    const times = (state.items + config.batch) / config.batch

    for (let i = 0; i < times; i++) {
      await loadMore(i * config.batch)
    }

    // scroll to persisted position
    window.scrollTo(0, state.scrollTop)

  })

})()
