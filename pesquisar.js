const searchInput = document.getElementById('search');
    const listItems = document.querySelectorAll('#list li');

    searchInput.addEventListener('input', () => {
      const search = searchInput.value.toLowerCase();

      listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(search) ? '' : 'none';
      });
    });