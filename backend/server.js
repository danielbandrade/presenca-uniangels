const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const attendenceRoute = require("./routes/attendenceRoute");
const userRoute = require("./routes/userRoute");
const memberRoute = require("./routes/memberRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");


const app = express();



const PORT = process.env.PORT || 5000;

// Minddlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


const ESPECIAL_ORIGINS = ['http://localhost:3000', 'https://precenca-uniangels-front.onrender.com', /\.vercel\.app$/, 'http://127.0.0.1:3000'];

const ALOWED_HEADERS = ['Content-Type','x-acess-token'];

const EXPOSED_HEADERS = ['x-acess-token'];

// app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://precenca-uniangels-front.onrender.com', 'https://presenca-uniangels-r3p51moz9-danielbandrades-projects.vercel.app/', 'http://127.0.0.1:3000'], allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type','x-acess-token'], exposedHeaders: ['X-Request-Id','x-acess-token']}));

app.use(cors({credentials: true, origin: ESPECIAL_ORIGINS, allowedHeaders: ALOWED_HEADERS, exposedHeaders: EXPOSED_HEADERS }));


app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes Middlewares

app.use("/api/users", userRoute);
app.use("/api/members", memberRoute);
app.use("/api/attendences", attendenceRoute);


// ROUTES
app.get("/", (req,res) => {
    res.send("Work In Progress, be patient");
})


// error Middleware
app.use(errorHandler);

// Conect to DB and start server
// Conect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { 
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`) 
        })
    })
    .catch((err) => console.log(err))