let apiKey = "AIzaSyDmj6CkAaq3J6R5WT8mt6rpmETzcxg2_F4";

function searchBooks() {
  const query = document.getElementById('searchInput').value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => displayBooks(data.items || []));
}

function displayBooks(books) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  books.forEach(item => {
    const info = item.volumeInfo;
    const book = {
      id: item.id,
      title: info.title || 'Без назви',
      author: (info.authors && info.authors[0]) || 'Невідомо',
      category: (info.categories && info.categories[0]) || 'Без категорії',
      rating: info.averageRating || '—',
      image: info.imageLinks?.thumbnail,
      previewLink: info.previewLink
    };

    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
      <img src="${book.image || 'https://via.placeholder.com/150'}">
      <h3>${book.title}</h3>
      <p><strong>Автор:</strong> ${book.author}</p>
      <p><strong>Категорія:</strong> ${book.category}</p>
      <p><strong>Рейтинг:</strong> ${book.rating}</p>
      <button class="add-btn">Додати до бібліотеки</button>
      <a href="${book.previewLink}" class="read-btn" target="_blank">Читати</a>
    `;

    bookCard.querySelector('.add-btn').addEventListener('click', () => addToLibrary(book));
    results.appendChild(bookCard);
  });
}

function addToLibrary(book) {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  if (!library.some(b => b.id === book.id)) {
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));
    alert('Книга додана до особистої бібліотеки!');
  } else {
    alert('Ця книга вже є у бібліотеці.');
  }
}