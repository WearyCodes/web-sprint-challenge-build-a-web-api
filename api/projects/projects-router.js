// Write your "projects" router here
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const { validateProjectId, validatePost } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
    Projects.get()
        .then(promise => {
            if (!promise) {
                res.send([])
            } else {
                res.send(promise)
            }
        })
        .catch(err => console.log(err))
})


router.get('/:id', validateProjectId, async (req, res, next) => {
    res.send(req.project)
    next()
})

router.post('/', validatePost, (req, res, next) => {
     Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => console.log(err))
})

router.put('/:id', validatePost, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(project => res.status(201).json(project))
    .catch(err=> console.log(err))
})

module.exports = router