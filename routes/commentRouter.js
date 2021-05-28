const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

//GET ALL FROM ISSUE
commentRouter.get("/issue/:issueId", (req, res, next) => {
    Comment.find({ issue: req.params.issueId })
        .populate("user")
        .exec((err, comments) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        })
})

//GET ALL FROM USER
commentRouter.get("/user", (req, res, next) => {
    Comment.find(
        { user: req.user._id },
        (err, comments) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        }
    )
})

//GET ONE
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.findOne({ _id: req.params.commentId })
        .populate("user")
        .exec((err, comment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log(comment)
            return res.status(200).send(comment)
        })
})

//ADD NEW COMMENT
commentRouter.post("/:issueId", (req, res, next) => {
    req.body.user = req.user._id
    req.body.issue = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        comment.populate('user', (err, comment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comment)
        })
    })
})

//EDIT COMMENT


//DELETE COMMENT

module.exports = commentRouter