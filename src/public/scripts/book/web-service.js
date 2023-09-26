const bookRepositoryUrl = '/api/book-repository';

export default class WebService {
  getBooksFromRepository = (
      onSuccess, onError, filterKey = null, sortKey = null,
      sortDirection = null) => {
    let url = `${bookRepositoryUrl}?`;
    if (filterKey) {
      url += `filterKey=${filterKey}`;
    }
    if (sortKey && sortDirection) {
      url += `&sortKey=${sortKey}&sortDirection=${sortDirection}`;
    }

    console.log(`GET ${url}`);
    return fetch(url, {
      method: 'GET',
    }).then(response => response.json()).then(data => {
      if (data === null || Object.keys(data).length === 0) {
        console.info('Library is empty');
        return;
      }
      onSuccess(data);
    }).catch(error => {
      console.error('Error while getting books from repository');
      onError(error);
    });
  };

  getBookFromRepository = (isbn, onSuccess, onError) => {
    const url = `${bookRepositoryUrl}/${isbn}`;
    return fetch(url, {
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
    console.log(`POST ${bookRepositoryUrl}: ${JSON.stringify(book)}`);
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

  deleteBookFromRepository = (isbn, onSuccess, onError) => {
    const url = `${bookRepositoryUrl}/${isbn}`;
    return fetch(url, {
      method: 'DELETE',
    }).then(response => {
      console.debug(
          `DELETE ${bookRepositoryUrl}/${isbn}: ${response.status}, ${response.statusText}`);
      if (response.status === 204) {
        onSuccess();
      } else {
        onError();
      }
    });
  };

  editBookInRepository = (isbn, book, onSuccess, onError) => {
    const url = `${bookRepositoryUrl}/${isbn}`;
    return fetch(url, {
      method: 'PUT',
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
      console.error('Error while editing book in repository');
      onError(error);
    });
  };

  editBookReaderInRepository = (isbn, reader, onSuccess, onError) => {
    const url = `${bookRepositoryUrl}/${isbn}/reader`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reader),
    }).then(response => response.json()).then(data => {
      if (data === null || Object.keys(data).length === 0) {
        console.info('Book is not found');
        return;
      }
      onSuccess(data);
    }).catch(error => {
      console.error('Error while editing book reader in repository');
      onError(error);
    });
  };

  deleteBookReaderFromRepository = (isbn, onSuccess, onError) => {
    const url = `${bookRepositoryUrl}/${isbn}/reader`;
    return fetch(url, {
      method: 'DELETE',
    }).then(response => {
      console.debug(
          `DELETE ${bookRepositoryUrl}/${isbn}/reader: ${response.status}, ${response.statusText}`);
      if (response.status === 204) {
        onSuccess();
      } else {
        onError();
      }
    });
  };
}
