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


router.delete('/:id', validateProjectId, (req, res, next) => {
    console.log('DELETING ROUTER', req.params)
    if (!Projects.get(req.params.id)) {res.status(404)}
    else {
    Projects.remove(req.params.id)
    .then(
        res.json({
            message: `Project with id: ${req.params.id} Deleted`
        })
    )
    .catch(err => console.log(err))}
})

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    const { id } = req.params
    res.send(req.project.actions)
})

module.exports = router