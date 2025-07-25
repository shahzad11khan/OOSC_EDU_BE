const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const dataEntryRoutes = require("./routes/dataEntryRoutes");
const userRoutes = require("./routes/userRoutes");
const toggleRoutes = require("./routes/toggleRoutes");
const AppSwagger = require("./Appswagger");
const CustomuiHTML = require("./CustomuiHTMl");
const allApiToggleMiddleware = require("./trubbleshoot/apiToggleMiddleware");

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/swagger.json',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(AppSwagger);
})


app.get('/api-docs',(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.send(CustomuiHTML);
})

// Routes
app.use("/control", toggleRoutes);
app.use(allApiToggleMiddleware);
// app.use("/", (req, res) => res.send("Backend running..."));
app.use("/api/users", userRoutes);
app.use("/api/entries", dataEntryRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

