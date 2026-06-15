// const express = require("express");
import express from "express";
import cors from "cors";

import dotenv from "dotenv/config";

import fs from  "fs";
import path from "path";

import {clerkMiddleware} from "@clerk/express";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FORNTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true})); //allowing frontend to access backend with credentials like cookies
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ok: true});
});
// if the public directory exists, serve the static files
// this is for the production build


if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
    app.get("/*",(req,res,next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
