// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next){
    const { id } = req.params
    await Projects.get(id)
    .then(project => {
        if (!project) {
            res.status(404)
        } else {
            req.project = project
            next()
        }
    })
    .catch(err => {
        res.status(404)
    })
    next()
}

// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// | Field       | Data Type | Metadata                                                                    |
// | ----------- | --------- | --------------------------------------------------------------------------- |
// | id          | number    | do not provide it when creating projects, the database will generate it     |
// | name        | string    | required                                                                    |
// | description | string    | required                                                                    |
// | completed   | boolean   | not required, defaults to false when creating projects                      |
async function validatePost (req, res, next) {
    console.log(req.method)
    const { name, description, completed} = req.body
    if ((name && description) && (req.method !== 'PUT' || typeof(completed) == 'boolean')){
        req.body = {
            name: name,
            description: description,
            completed: completed ? completed : false
        }
        next()
    } else {
        res.status(400).json({
            message: 'Missing name, description, or completed'
        })
    }
}


module.exports = {
    validateProjectId,
    validatePost,
}