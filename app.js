const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user-routes')

const app = express();


app.use(express.json())
app.use("/api/users", userRouter)

mongoose.connect(
  "mongodb+srv://blog:Kin00243!@blog.6zbzdqu.mongodb.net/Blog?retryWrites=true&w=majority"
).then(() => {
  app.listen(8080, () => {
    console.log('Api running on port 8080');
  })
  console.log('Connected to mongoDB');
}).catch((error) => {
  console.log('====================================');
  console.log(error);
  console.log('====================================');
})


