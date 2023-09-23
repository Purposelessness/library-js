const bookRepositoryUrl = '/api/book-repository';

export default class WebService {
  getBooksFromRepository = (onSuccess, onError) => {
    return fetch(bookRepositoryUrl, {
      method: 'GET',
    }).then(response => response.json()).then(data => {
      if (data === null || Object.keys(data).length === 0) {
        console.info('Library is empty');
        return;
      }
      const books = new Map(data);
      onSuccess(books);
    }).catch(error => {
      console.error('Error while getting books from repository');
      onError(error);
    });
  };

  getBookFromRepository = (isbn, onSuccess, onError) => {
    return fetch(`${bookRepositoryUrl}/${isbn}`, {
      method: 'GET',
    }).then(response => response.json()).then(data => {
      if (data === null || Object.keys(data).length === 0) {
        console.info('Book is not found');
        return;
      }
      console.info(`Book with ISBN ${isbn} is found: ${data}`);
      onSuccess(data);
    }).catch(error => {
      console.error('Error while getting book from repository');
      onError(error);
    });
  };

  addBookToRepository = (book, onSuccess, onError) => {
    return fetch(bookRepositoryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    }).then(response => response.json()).then(data => {
      if (data === null || Object.keys(data).length === 0) {
        console.info('Book is not found');
        return;
      }
      onSuccess(data);
    }).catch(error => {
      console.error('Error while getting book from repository');
      onError(error);
    });
  };
}
