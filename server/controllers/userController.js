const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const userAuth = require("../middlewares/userAuth");
const Problem = require("../models/problemModel");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({path : "../.env"});

async function userExists(username) {
    const user = await User.findOne({ username });
    return (user ? true : false);
}

async function userValid(username, password) {
    const user = await User.findOne({ username });
    if (!user) return false;

    const passwordMatched = await bcrypt.compare(password, user.password);
    return passwordMatched;
}

async function userLogin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username / Password cannot be empty" });
        return;
    }

    if (await userValid(username, password)) {
        const token = userAuth.generateUserToken(username);
        res.status(200).json({ message: "Logged in successfully", token });
    }
    else {
        res.status(400).json({ message: "Invalid credentials" });
    }
}

async function userRegister(req, res) {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username / Password cannot be empty" });
        return;
    }

    if (await userExists(username)) {
        res.status(400).json({ message: "Username already exists" });
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
}

async function userDetails(req, res) {
    const username = req.user.username;
    const details = await User.findOne({ username });
    const problemSolved = details.problemSolved;
    res.status(200).json({ message: "here is the user", user: req.user, problemSolved: problemSolved });
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        const userData = [];
        for (let i = 0; i < users.length; i++) {
            const newUser = {
                username : users[i].username,
                problemSolved : users[i].problemSolved.length
            };
            userData.push(newUser);
        }
        userData.sort((a, b) => b.problemSolved - a.problemSolved);
        res.status(200).json({userData});
    } catch (error) {
        res.status(400).json({"message" : "cannot get data"});
    }
}

function createrUserProblem(problem) {
    const newProblem = {
        id: problem.id,
        title: problem.title,
        description: problem.description,
        constraints: problem.constraints,
        sampleInput: problem.sampleInput,
        sampleOutput: problem.sampleOutput,
        difficulty: problem.difficulty,
        tags: problem.tags
    }
    return newProblem;
}

async function allProblems(req, res) {
    const problems = await Problem.find({});
    if (!problems) {
        res.status(400).json({ message: "No problem found" });
    }
    else {
        const newProblems = [];
        for (let i = 0; i < problems.length; i++) {
            const newProblem = createrUserProblem(problems[i]);
            newProblems.push(newProblem);
        }
        res.status(200).json({ problems: newProblems });
    }
}

async function problemID(req, res) {
    const id = req.params.id;
    const problem = await Problem.findOne({ id });
    if (!problem) {
        res.status(404).json({ message: "Problem not found" });
    }
    else {
        const newProblem = createrUserProblem(problem);
        res.status(200).json({ problem: newProblem });
    }
}

async function compileCode(code, input, language) {

    const options = {
        method: 'POST',
        url: `${process.env.API_URL}`,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': `${process.env.API_KEY}`,
            'X-RapidAPI-Host': `${process.env.API_HOST}`
        },
        data: {
            language: language,
            version: 'latest',
            code: code,
            input: input
        }
    };

    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}

async function returnCompiledCode(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var language;
    if (req.body.language == 0) language = "cpp17";
    else if (req.body.language == 1) language = "java";
    else if (req.body.language == 2) language = "python3";

    try {
        const response = await compileCode(code, input, language);
        res.status(200).json({ output: response.data });
    } catch (error) {
        res.status(400).json({ error });
    }
}

async function submitCode(req, res) {
    var username = req.body.username;
    var id = req.body.id;
    var problemTitle = req.body.problemTitle;
    var code = req.body.code;
    var language;
    if (req.body.language == 0) language = "cpp17";
    else if (req.body.language == 1) language = "java";
    else if (req.body.language == 2) language = "python3";

    const problem = await Problem.findOne({ id });
    const testCases = problem.testCases;
    const outputOfTestCases = problem.outputOfTestCases;
    const output = [];
    var matched = true;
    var wrongTestCase = -1;

    for (let i = 0; i < testCases.length; i++) {
        try {
            const response = await compileCode(code, testCases[i], language);
            output.push(response.data.output);
            if (output[i] != outputOfTestCases[i]) {
                matched = false;
                wrongTestCase = i + 1;
                break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (matched) {
        try {
            const toPush = id + ":" + problemTitle;
            const user = await User.findOneAndUpdate(
                { username, problemSolved: { $ne: toPush } },
                { $addToSet: { problemSolved: toPush } },
                { new: true }
            );
            res.status(200).json({ "result": "Accepted" });
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
    else {
        res.status(200).json({ "result": `Wrong answer on test ${wrongTestCase}` })
    }
}

module.exports = { userLogin, userRegister, userDetails, getAllUsers, allProblems, problemID, returnCompiledCode, submitCode };