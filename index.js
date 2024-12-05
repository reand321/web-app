import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { itemRouter } from './routes/itemRoutes.js';
import { recommendationRouter } from './routes/recommendationRoutes.js';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Make sure images can be served
app.use('/api/items', itemRouter);
app.use('/api/recommendations', recommendationRouter);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
