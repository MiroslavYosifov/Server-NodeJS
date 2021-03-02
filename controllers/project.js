import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getOneProject: async (req, res, next) => {

        },
        getAllProjects: async (req, res, next) => {

        }
    },
    post: {
        addProject: async (req, res, next) => {
            const { name, description } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const project = await Project.create({ name, description, date: Date.now(), creator: creatorId });
                const user = await User.findById(creatorId);
            
                project.members.push(creatorId);
                project.save();

                user.ownProjects.push(project._id);
                user.save();
                
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
        updateProject: async (req, res, next) => {

        }
    },
    delete: {
        removeProject: async (req, res, next) => {

        }
    }
}


// ISSUE
// name:  { type: String, required: true },
// description: { type: String, required: true },
// status: { type: String, required: true },
// date: { type: String, required: true },
// creator: { type: Schema.Types.ObjectId, ref: 'User' },
// project: { type: Schema.Types.ObjectId, ref: 'Project' },
// feature: { type: Schema.Types.ObjectId, ref: 'Feature' },

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
