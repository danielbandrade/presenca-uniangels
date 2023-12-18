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

const app = express();



const PORT = process.env.PORT || 5000;

// Minddlewares
app.use(express. json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://precenca-uniangels-front.onrender.com', 'https://presenca-uniangels-r3p51moz9-danielbandrades-projects.vercel.app/', 'http://127.0.0.1:3000']}));

console.log('cors with *')

// Investigar Same site Cookie

/*app.use(cors([{ origin:['http://localhost:3000',
'https://precenca-uniangels-front.onrender.com', 
'https://presenca-uniangels-r3p51moz9-danielbandrades-projects.vercel.app/' ], credentials: true}])); */

// ver para configurar cors https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/


app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes Middlewares

app.use("/api/users", userRoute);
app.use("/api/members", memberRoute);
app.use("/api/attendences", attendenceRoute);


// ROUTES
app.get("/", (req,res) => {
    res.send("Alow Gagau!");
})


// error Middleware
app.use(errorHandler);

// Conect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { 
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`) 
        })
    })
    .catch((err) => console.log(err))