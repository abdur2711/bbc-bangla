const categoryContainer = document.getElementById('category-container');
const newsContainer = document.getElementById('news-container');
const bookmarkContainer = document.getElementById('bookmark-container');
const bookmarkCount = document.getElementById('bookmark-count');

let bookmarks = [];

const loadCategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch(err => {
      console.log(err);
    })
};

const showCategory = (categories) => {
  categories.forEach(category => {
    categoryContainer.innerHTML += `
    <li id="${category.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${category.title}</li>
    `
  });
  categoryContainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('li');
    allLi.forEach(li => {
      li.classList.remove('border-b-4')
    })

    if (e.target.localName === 'li') {
      showLoading();
      e.target.classList.add('border-b-4');
      loadNewsByCategory(e.target.id)
    }
  })
};

// News by category
const loadNewsByCategory = (id) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${id}`)
  .then(res => res.json())
  .then(data => {
    showNewsByCategory(data.articles);
  })
  .catch(err => {
    console.log(err)
    showErr();
  })
}

const showNewsByCategory = (articles) => {
  if (articles.length === 0) {
    showEmptyMessage();
    return;
  }

  newsContainer.innerHTML = '';

  articles.forEach(article => {
    newsContainer.innerHTML += `
      <div class="border border-gray-200 rounded-lg">
        <div>
          <img src="${article.image.srcset[5].url}">
        </div>
        <div id="${article.id}" class="p-2">
          <h1 class="font-extrabold">${article.title}</h1>
          <p class="text-sm">${article.time}</p>
          <button class="btn">Bookmark</button>
        </div>
      </div>
    `
  })
}

// Add to bookmark
newsContainer.addEventListener('click', (e) => {
  if(e.target.innerText === 'Bookmark') {
    handleBookmarks(e)
  }
})

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;
    const id = e.target.parentNode.id;

    bookmarks.push({
      title: title,
      id: id,
    })
    showBookmarks(bookmarks)
}

const showBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = '';

  bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML += `
      <div class="border border-gray-400 my-2 p-1">
        <h1>${bookmark.title}</h1>
        <button class="btn btn-xs" onclick="handleDeleteBookmark('${bookmark.id}')">Delete</button>
      </div>
    `
  })
  bookmarkCount.innerText = bookmarks.length;
}

const handleDeleteBookmark = (id) => {
  const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)

  bookmarks = filteredBookmarks;
  showBookmarks(bookmarks);
}

const showLoading = () => {
  newsContainer.innerHTML = `
    <div class="bg-green-600 p-5">Loading...</div>
  `
}

const showErr = () => {
  newsContainer.innerHTML = `
    <div class="bg-red-500 p-5">Something went wrong!</div>
  `
}

const showEmptyMessage = () => {
  newsContainer.innerHTML = `
    <div class="bg-orange-600 p-5">No news found in this category</div>
  `
}

loadCategory();
loadNewsByCategory('main')

// const loadCategoryAsync = async () => {
//   try {
//     const res = await fetch('https://news-api-fs.vercel.app/api/categories')
//     const data = await res.json()
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// loadCategoryAsync() 