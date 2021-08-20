import app from './app';

app.listen(process.env.APP_PORT || 3100, () => {
  console.log(`listening on port ${process.env.APP_PORT}`);
})