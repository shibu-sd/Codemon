const mongoose = require("mongoose");

const blogSchema = {
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    likes : {
        type : Number,
        default : 0
    }
}

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;