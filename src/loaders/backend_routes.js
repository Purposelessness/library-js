import bookRepositoryModule
  from '../components/book-repository/book-repository.js';

export default (app) => {
  app.use('/api/book-repository', bookRepositoryModule.router);
};