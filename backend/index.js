import express from 'express';
import connectToDB from './connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import path from 'path';

const __dirname = path.resolve();

dotenv.config()
const app = express()

connectToDB("mongodb://0.0.0.0:27017/stackoverflow")
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.error("Error while conecting to DB", error)
})

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use('/api', Router)
app.use(express.static(path.join(__dirname, "../stackoverflow/build")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});