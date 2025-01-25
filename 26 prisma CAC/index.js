const cookieParser = require("cookie-parser");
const express = require("express");

require("dotenv").config();
const app = express();

// Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Middleware
app.use(cookieParser());

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
app.use("/api", userRouter);
app.use("/api", postRouter);

app.get("/", (req, res) => {
	res.send("Hi atul! this is prisma project");
});

app.listen(8000, () => {
	console.log("Server listening n port 8000");
});