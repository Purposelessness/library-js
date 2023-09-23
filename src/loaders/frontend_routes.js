export default (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Library' });
  });
  app.get('/book', (req, res) => {
    res.render('book_index');
  });
}