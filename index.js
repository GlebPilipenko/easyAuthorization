import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter.js';
import usersRouter from './routes/userRouter.js';

const PORT = 8080;

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

async function startApp() {
  try {
    // Bad practice, but not work through .env or config
    const url = 'mongodb+srv://gleb:E2uti7Bx3gaBwmKz@easyauthorization.ocflb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    await mongoose.connect(url);

    app.listen(PORT, () => console.log(`Server started in ${PORT} port.`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
