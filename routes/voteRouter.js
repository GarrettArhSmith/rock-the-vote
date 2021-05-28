const express = require('express')
const voteRouter = express.Router()
const Issue = require('../models/issue')
const Comment = require('../models/comment')


//CHECK IF VOTED
// voteRouter.get("/:issueId", (req, res, next) => {
//     Issue.findOne(
//     {
//         _id: req.params.issueId,
//         $or: [
//             { upVoters: { $in: [req.user._id] } },
//             { downVoters: { $in: [req.user._id] } }
//         ]
//     },
//     (err, issue) => {
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(issue)
//     })
// })

//ADD UPVOTE TO ISSUE
voteRouter.put("/up/add/issue/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { upVoters: req.user._id },
          $pull: { downVoters: req.user._id } },
        { new: true },
        (err, upVotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedIssue)
        }
    )
})

//ADD DOWNVOTE TO ISSUE
voteRouter.put("/down/add/issue/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { downVoters: req.user._id },
          $pull: { upVoters: req.user._id } },
        { new: true },
        (err, downVotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedIssue)
        }
    )
})

//DELETE UPVOTE FROM ISSUE
voteRouter.put("/up/delete/issue/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $pull: { upVoters: req.user._id } },
        { new: true },
        (err, issue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(issue)
        }
    )
})

//DELETE DOWNVOTE FROM ISSUE
voteRouter.put("/down/delete/issue/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $pull: { downVoters: req.user._id } },
        { new: true },
        (err, issue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(issue)
        }
    )
})

///////////////////////////////////////////

//ADD UPVOTE TO COMMENT
voteRouter.put("/up/add/comment/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $addToSet: { upVoters: req.user._id },
          $pull: { downVoters: req.user._id } },
        { new: true },
        (err, upVotedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedComment)
        }
    )
})

//ADD DOWNVOTE TO COMMENT
voteRouter.put("/down/add/comment/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $addToSet: { downVoters: req.user._id },
          $pull: { upVoters: req.user._id } },
        { new: true },
        (err, downVotedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedComment)
        }
    )
})

//DELETE UPVOTE FROM COMMENT
voteRouter.put("/up/delete/comment/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $pull: { upVoters: req.user._id } },
        { new: true },
        (err, comment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comment)
        }
    )
})

//DELETE DOWNVOTE FROM COMMENT
voteRouter.put("/down/delete/comment/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $pull: { downVoters: req.user._id } },
        { new: true },
        (err, comment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comment)
        }
    )
})

module.exports = voteRouter