export default function errorHandler(err, req, res, next) {
  if (err) {
    console.error(err.stack);
    return res
      .status(500)
      .send({
        id: 'ERROR',
        type: 'ERROR',
        name: 'Oops!',
        buttons: ['CLOSE'],
        actions: [],
        appData: {
          errorMessage: err.message
        }
      });
  }
  next();
}
