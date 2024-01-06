const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const adminRouter = require("../server/routes/adminRoute");
const userRouter = require("../server/routes/userRoute");

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => { res.status(200).json({ message: "Hello from backend" }) });

mongoose.connect(MONGO_URI);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.listen(PORT, console.log(`Server running at port ${PORT}`));