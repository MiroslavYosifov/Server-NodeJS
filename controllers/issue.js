import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getIssue: async (req, res, next) => {

        }
    },
    post: {
        addIssue: async (req, res, next) => {
            const { name, description, status, featureId } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const issue = await Issue.create({ name, description, status, date: Date.now(), creator: creatorId, feature: featureId, project: projectId });
                
                user.issues.push(issue._id);
                user.save();

                feature.issues.push(issue._id);
                feature.save();

                res
                .status(201)
                .send(issue);

    
            } 
            catch (error) {
                console.log(error);
            }
        },
    },
    put: {
        updateIssue: async (req, res, next) => {

        },
    },
    delete: {
        removeIssue: async (req, res, next) => {

        },
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

