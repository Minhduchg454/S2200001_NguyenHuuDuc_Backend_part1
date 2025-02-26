// Them cac framework can thiet
const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route");

const ApiError = require("./app/api-error");

// Khoi tao ung dung, mot the hien cua express
const app = express();

// Dinh nghia cac middleware, 
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Dinh nghia cac route
app.get("/", (req, res) => {
  res.json({ message: "Wellcome to contact book application." });
})

// Middleware xu ly loi
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server Error",
    });
});

//Xuat module app de co the su dung o file khac
module.exports = app;
