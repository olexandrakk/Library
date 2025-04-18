document.addEventListener('DOMContentLoaded', () => {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  const container = document.getElementById('personalLibrary');
  container.innerHTML = '';

  const searchInput = document.getElementById('searchLibraryInput');
  searchInput.addEventListener('input', () => filterLibrary(searchInput.value.toLowerCase()));

  function renderBooks(books) {
    container.innerHTML = '';
    if (books.length === 0) {
      container.innerHTML = '<p>Бібліотека порожня або нічого не знайдено.</p>';
      return;
    }

    books.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <img src="${book.image || 'https://via.placeholder.com/150'}">
        <h3>${book.title}</h3>
        <p><strong>Автор:</strong> ${book.author}</p>
        <p><strong>Категорія:</strong> ${book.category}</p>
        <p><strong>Рейтинг:</strong> ${book.rating}</p>
        <div class="button-group">
          <button class="remove-btn" data-index="${index}">Видалити</button>
          <a href="${book.previewLink}" class="read-btn" target="_blank">Читати</a>
        </div>
      `;

      bookCard.querySelector('.remove-btn').addEventListener('click', () => {
        library.splice(index, 1);
        localStorage.setItem('library', JSON.stringify(library));
        renderBooks(library);
      });

      container.appendChild(bookCard);
    });
  }

  function filterLibrary(query) {
    const filtered = library.filter(book => book.title.toLowerCase().includes(query));
    renderBooks(filtered);
  }

  renderBooks(library);
});
