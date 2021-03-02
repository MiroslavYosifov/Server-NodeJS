import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getFeature: async (req, res, next) => {

        },
    },
    post: {
        addFeature: async (req, res, next) => {
            const { name, description, status, projectId } = req.body;
            const creatorId = req.authUser._id;
            // const projectId = ''; // TO DO SHOULD GET PROJECT ID FROM URL PARAMS
            // TO DO VALDIATION OF DATA
            try {
                const feature = await Feature.create({ name, description, status, date: Date.now(), creator: creatorId, project: projectId });
                const user = await User.findById(creatorId);
                const project = await Project.findById(projectId);

                project.features.push(feature._id);
                project.save();

                user.features.push(feature._id);
                user.save();

                res
                .status(201)
                .send(feature);

            } 
            catch (error) {
             console.log(error);
            }
        }
    },
    put: {
        updateFeature: async (req, res, next) => {

        },
    },
    delete: {
        removeFeature: async (req, res, next) => {

        },
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
