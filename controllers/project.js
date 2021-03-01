import { Project } from '../models/index.js';

export default {
    get: {

    },
    post: {
        addOneProject: async (req, res, next) => {
            const { name, description } = req.body;
            const creator = req.authUser._id;

            try {
                const project = await Project.create({ name, description, date: Date.now(), creator });
                project.members.push(creator);
                project.save();
                res
                .status(201)
                .send(project);
            } 
            catch (error) {
                console.log(error);
            }
        }
    },
    put: {
        putFeature: async (req, res, next) => {

        },
        putIssue: async (req, res, next) => {

        },
        putSuggestion: async (req, res, next) => {

        },
    },
    delete: {

    }
}

//  FEATURE
//  name:  { type: String, required: true },
//  date: { type: String, required: true },
//  status: { type: String, required: true }, // IN SUGGESTED // IN DEVELOPMENT // IN TESTING // COMPLETED
//  creator: { type: Schema.Types.ObjectId, ref: 'User' },
//  project: { type: Schema.Types.ObjectId, ref: 'Project' },
//  suggestion: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
//  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],

//  PROJECT
//  name:  { type: String, required: true },
//  description: { type: String, required: true },
//  date: { type: String, required: true },
//  creator: { type: Schema.Types.ObjectId, ref: 'User' },
//  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//  features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
