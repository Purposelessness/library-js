import bookRepositoryModule
  from '../components/book-repository/book-repository.js';

export default (app) => {
  app.use('/book/repository', bookRepositoryModule.router);
};