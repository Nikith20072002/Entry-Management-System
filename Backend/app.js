require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/visitor", require("./routes/visitorRoutes"));
app.use("/api/resident", require("./routes/residentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));



app.listen(5000, () => console.log("Server running on port 5000"));
