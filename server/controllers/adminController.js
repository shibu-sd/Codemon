const Admin = require("../models/adminModel");
const Problem = require("../models/problemModel");
const bcrypt = require("bcrypt");
const adminAuth = require("../middlewares/adminAuth");

async function adminExists(username) {
    const admin = await Admin.findOne({username});
    return (admin ? true : false);
}

async function adminValid(username, password) {
    const admin = await Admin.findOne({username});
    if (!admin) return false;

    const passwordMatched = await bcrypt.compare(password, admin.password);
    return passwordMatched;
}

async function adminLogin(req, res) {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({message : "Username / Password cannot be empty"});
        return;
    }

    if (await adminValid(username, password)) {
        const token = adminAuth.generateAdminToken(username);
        res.status(200).json({message : "Logged in successfully", token});
    }
    else {
        res.status(400).json({message : "Invalid credentials"});
    }
}

async function adminRegister(req, res) {
    let {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({message : "Username / Password cannot be empty"});
        return;
    }

    if (await adminExists(username)) {
        res.status(400).json({message : "Username already exists"});
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        res.status(201).json({message : "Admin registered successfully"});
    }
}

async function problemExists(id) {
    const problem = await Problem.findOne({id});
    return (problem ? true : false);
}

async function allProblems(req, res) {
    const problems = await Problem.find({});
    if (!problems) {
        res.status(400).json({message : "No problem found"});
    }
    else {
        res.status(200).json({problems : problems});
    }
}

async function createProblem(req, res) {
    const {id, title, description, constraints, sampleInput, sampleOutput, difficulty, tags, testCases, outputOfTestCases} = req.body;
    
    if (!id || !title || !description || !constraints || !sampleInput || !sampleOutput || !difficulty || !tags || !testCases || !outputOfTestCases) {
        res.status(400).json({message : "Any of the fields cannot be empty"});
        return;
    }

    if (await problemExists(id)) {
        res.status(400).json({message : "Problem ID already exists"});
    }
    else {
        const newProblem = new Problem({id, title, description, constraints, sampleInput, sampleOutput, difficulty, tags, testCases, outputOfTestCases});
        await newProblem.save();
        res.status(201).json({message : "Problem created successfully"});
    }
}

async function deleteProblem(req, res) {
    const {id} = req.body;
    
    if (!id) {
        res.status(404).json({message : "Problem ID not found"});
        return;
    }

    if (await problemExists(id)) {
        const problem = await Problem.findOne({id});

        if (problem) {
            await problem.deleteOne();
            res.status(200).json({message : "Problem deleted successfully"});
        }
        else {
            res.status(404).json({message : "Problem does not exists"});
        }
    }    
}

async function editProblem(req, res) {
    const {id, title, description, constraints, sampleInput, sampleOutput, difficulty, tags, testCases, outputOfTestCases} = req.body;
    
    if (!id || !title || !description || !constraints || !sampleInput || !sampleOutput || !difficulty || !tags || !testCases || !outputOfTestCases) {
        res.status(400).json({message : "Any of the fields cannot be empty"});
        return;
    }

    if (await problemExists(id)) {
        const problem = await Problem.findOne({id});
        
        if (problem) {
            await problem.deleteOne();
            const newProblem = new Problem(req.body);
            await newProblem.save();
            res.status(200).json({message : "Problem updated successfully"});
        }
        else {
            res.status(404).json({message : "Problem not found"});
        }
    }
    else {
        res.status(404).json({message : "Problem does not exist"});
    }
}

module.exports = {adminLogin, adminRegister, allProblems, createProblem, deleteProblem, editProblem};