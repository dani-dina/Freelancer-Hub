import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './src/routes/admin.routes';
import conn from './src/config/db.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TS Express Server');
});

app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`I am running on port ${PORT}`);
});
