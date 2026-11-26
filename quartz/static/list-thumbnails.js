(() => {
  const fallback = `${document.body.dataset.basepath || ""}/static/icon.png`

  function addThumbnail(item) {
    const link = item.querySelector(".section > .desc a[href]")
    const section = item.querySelector(".section")
    if (!link || !section || section.querySelector(".post-thumbnail")) return

    const thumbnail = document.createElement("a")
    thumbnail.className = "post-thumbnail"
    thumbnail.href = link.href
    thumbnail.tabIndex = -1
    thumbnail.setAttribute("aria-hidden", "true")

    const image = document.createElement("img")
    image.alt = ""
    image.loading = "lazy"
    image.className = "is-fallback"
    image.src = fallback
    image.addEventListener("error", () => {
      if (!image.classList.contains("is-fallback")) {
        image.classList.add("is-fallback")
        image.src = fallback
      }
    })
    thumbnail.append(image)
    section.append(thumbnail)

    fetch(link.href)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load article")
        return response.text().then((html) => ({ html, url: response.url }))
      })
      .then(({ html, url }) => {
        const page = new DOMParser().parseFromString(html, "text/html")
        const firstImage = page.querySelector("article img[src]")
        const src = firstImage?.getAttribute("src")
        if (!src) return
        image.classList.remove("is-fallback")
        image.src = new URL(src, url).href
      })
      .catch(() => {})
  }

  document.querySelectorAll(".page-listing .section-li").forEach(addThumbnail)

  // The explorer creates its tree asynchronously from the content index.
  document.querySelectorAll(".explorer").forEach((explorer) => {
    let pending = false
    const updateCounts = () => {
      pending = false
      explorer.querySelectorAll(".folder-container").forEach((folder) => {
        const title = folder.querySelector(".folder-title")
        const children = folder.nextElementSibling
        if (title && children?.classList.contains("folder-outer")) {
          title.dataset.count = String(children.querySelectorAll("a.nav-file-title").length)
        }
      })
    }
    const observer = new MutationObserver(() => {
      if (!pending) {
        pending = true
        requestAnimationFrame(updateCounts)
      }
    })
    observer.observe(explorer, { childList: true, subtree: true })
    updateCounts()
  })
})()
