const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');

const app = express();

app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

mongoose.connect(
  'mongodb+srv://blog:Kin00243!@blog.6zbzdqu.mongodb.net/Blog?retryWrites=true&w=majority',
).then(() => {
  app.listen(8080, () => {
    console.log('Api running on port 8080');
  });
  console.log('Connected to mongoDB');
}).catch((error) => {
  console.log(error);
});
