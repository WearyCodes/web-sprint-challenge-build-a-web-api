// Write your "actions" router here!
const Actions = require('../actions/actions-model')
const express = require('express')
const router = express.Router()
const { verifyActions, verifyActionPost } = require('./actions-middlware')
// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => res.send(actions))
    .catch(err => console.log(err))
})

router.get('/:id', verifyActions, async (req, res, next) => {})

router.post('/', verifyActionPost, (req, res, next) => {
    console.log('HERE IS THE ACTION', req.action)
    Actions.insert(req.action)
   .then(newAction => {
       res.status(201).json(newAction)
   })
   .catch(err => console.log(err))
})

router.put('/:id', verifyActionPost, (req, res, next) => {
    Actions.update(req.params.id, req.action)
    .then(action => res.status(201).json(action))
    .catch(err=> console.log(err))
})

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.delete('/:id', (req, res, next) => {
    console.log('DELETING ACTION', req.params)
    Actions.remove(req.params.id)
    .then(answer => res.send())
    .catch(err => console.log(err))
}
)

module.exports = router