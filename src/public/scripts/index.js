const saveBooksLink = document.getElementById('save-books-button');
saveBooksLink.addEventListener('click', async () => {
  console.log('Save books link is clicked');
  await fetch('api/book-repository/save', {
    method: 'POST',
  });
});
