const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

router.post("/login", (req, res) => {
    userController.userLogin(req, res);
});

router.post("/register", (req, res) => {
    userController.userRegister(req, res);
});

router.get("/problemset", userAuth.authenticateUser, (req, res) => {
    userController.allProblems(req, res);
});

router.get("/problemset/:id", userAuth.authenticateUser, (req, res) => {
    userController.problemID(req, res);
});

router.get("/blogs", userAuth.authenticateUser, (req, res) => {
    userController.getAllBlogs(req, res);
});

router.post("/publishblog", userAuth.authenticateUser, (req, res) => {
    userController.publishBlog(req, res);
});

router.post("/compile", userAuth.authenticateUser, (req, res) => {
    userController.returnCompiledCode(req, res);
});

router.post("/submit", userAuth.authenticateUser, (req, res) => {
    userController.submitCode(req, res);
});

router.get("/me", userAuth.authenticateUser, (req, res) => {
    userController.userDetails(req, res);
});

router.get("/allusers", userAuth.authenticateUser, (req, res) => {
    userController.getAllUsers(req, res);
});

module.exports = router;