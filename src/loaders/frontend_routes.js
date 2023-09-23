export default (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Library' });
  });
  app.get('/book', (req, res) => {
    res.render('book/index');
  });
  app.get('/book/:isbn(\\d+)', (req, res) => {
    res.render('book/details', { isbn: req.params.isbn });
  });
}