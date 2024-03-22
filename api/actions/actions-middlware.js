// add middlewares here related to actions
const Actions = require('../actions/actions-model')

async function verifyActions(req, res, next) {
    const {id} = req.params;
    await Actions.get(id)
    .then(actions => {
        if (actions === null){res.status(404).send('BAD BAD BAD')}
        else {
            res.send(actions)
        }
    })
    .catch(err => console.log(err))
}

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// | Field       | Data Type | Metadata                                                                                         |
// | ----------- | --------- | ------------------------------------------------------------------------------------------------ |
// | id          | number    | do not provide it when creating actions, the database will generate it                           |
// | project_id  | number    | required, must be the id of an existing project                                                  |
// | description | string    | required, up to 128 characters long                                                              |
// | notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  |
// | completed   | boolean   | not required, defaults to false when creating actions                                            |

function verifyActionPost (req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !description || !notes) {res.status(400).send('YOU NEED ALL THE REQUIRED STUFF')}
    else {
        req.action = req.body
        console.log(req.action)
        next()
    }
}
 
module.exports = {
    verifyActions,
    verifyActionPost
}