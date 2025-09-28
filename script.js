const categoryContainer = document.getElementById('category-container');

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
      e.target.classList.add('border-b-4')
    }
  })
}


loadCategory();


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