const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    upVoters: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVoters: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)