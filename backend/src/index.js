// const express = require("express");
import express from "express";
import cors from "cors";

import dotenv from "dotenv/config"; 

import {clerkMiddleware} from "@clerk/express";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FORNTEND_URL;

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true})); //allowing frontend to access backend with credentials like cookies
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ok: true});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
