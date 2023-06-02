import express from 'express';
import cors from 'cors';
import { heroesRouter } from './routes/heroes-routes';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT;

app.use('/heroes', heroesRouter);

app.listen(PORT, () => {
    console.log(`work on ${PORT}`);
})
