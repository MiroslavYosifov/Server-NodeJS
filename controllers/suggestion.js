import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getSuggestion: async (req, res, next) => {

        },
    },
    post: {
        addSuggestion: async (req, res, next) => {
            const { name, description, status, featureId } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const suggestion = await Suggestion.create({ name, description, status, date: Date.now(), creator: creatorId, feature: featureId, project: projectId  });
               
                user.suggestions.push(suggestion._id);
                user.save();

                feature.suggestions.push(suggestion._id);
                feature.save();

                res
                .status(201)
                .send(suggestion);

    
            } 
            catch (error) {
                console.log(error);
            }
        },
    },
    put: {
        updateSuggestion: async (req, res, next) => {

        },
    },
    delete: {
        removeSuggestion: async (req, res, next) => {

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
