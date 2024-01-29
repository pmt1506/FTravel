import express from "express";
import cors from "cors";

import * as dotenv from 'dotenv';

import connectDB from "./database.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}/ `);
});