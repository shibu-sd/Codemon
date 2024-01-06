const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    constraints: {
        type: String,
        required: true
    },
    sampleInput: {
        type: String,
        required: true
    },
    sampleOutput: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    testCases: {
        type: [mongoose.Schema.Types.Mixed],
        required : true
    },
    outputOfTestCases: {
        type: [mongoose.Schema.Types.Mixed],
        required : true
    }
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;