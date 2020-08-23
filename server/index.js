import express from "express";
import http from "http";

// boilerplate express server
const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Listening on: ${PORT}`));