const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/login", (req, res) => {
    adminController.adminLogin(req, res);
});

router.post("/register", (req, res) => {
    adminController.adminRegister(req, res);
});

router.get("/problemset", adminAuth.authenticateAdmin, (req, res) => {
    adminController.allProblems(req, res);
})

router.post("/createproblem", adminAuth.authenticateAdmin, (req, res) => {
    adminController.createProblem(req, res);
});

router.post("/deleteproblem", adminAuth.authenticateAdmin, (req, res) => {
    adminController.deleteProblem(req, res);
});

router.put("/editproblem", adminAuth.authenticateAdmin, (req, res) => {
    adminController.editProblem(req, res);
});

router.get("/me", adminAuth.authenticateAdmin, (req, res) => {
    res.status(200).json({message : "here is the admin", admin : req.admin})
});

module.exports = router;