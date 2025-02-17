const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("../Controll");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router
// app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error", error: err });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
