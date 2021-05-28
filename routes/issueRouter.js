const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

//GET ALL USER ISSUES
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id })
        .populate('user')
        .exec((err, issues) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
})

//GET ALL
issueRouter.get("/", (req, res, next) => {
    Issue.find()
        .populate('user')
        .exec((err, issues) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
})

//GET ONE
issueRouter.get("/:issueId", (req, res, next) => {
    Issue.findOne({ _id: req.params.issueId })
        .populate('user')
        .exec((err, issue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issue)
        })
})

//POST ISSUE
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, issue) => {
        issue.populate('user', (err, issue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(issue)
        })
    })
})

//UPDATE ISSUE
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

//DELETE ISSUE
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.user._id },
        (err, deletedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(`Successfully deleted Issue: ${deletedIssue.title}`)
        }
    )
})

module.exports = issueRouter