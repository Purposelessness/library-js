export default (app) => {
  app.get('/book', (req, res) => {
    res.render('book_index');
  })
}