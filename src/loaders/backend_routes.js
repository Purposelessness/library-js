import bookRepositoryModule
  from '../components/book-repository/book-repository.js';

export default (app) => {
  app.use('/api/book-repository', bookRepositoryModule.router);

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err);
    let status = err.code || 500;
    res.status(status).
        send(status === 500 ? 'Internal Server Error' : err.message);
  });
};